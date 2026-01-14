import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = path.join(__dirname, '..', '.amplenote-tokens.json');

const AUTH_URL = 'https://login.amplenote.com/login';
const TOKEN_URL = 'https://api.amplenote.com/oauth/token';

export class OAuthHandler {
  constructor() {
    this.clientId = process.env.AMPLENOTE_CLIENT_ID;
    this.clientSecret = process.env.AMPLENOTE_CLIENT_SECRET;
    this.redirectUri = process.env.AMPLENOTE_REDIRECT_URI || 'http://localhost:3000/callback';

    if (!this.clientId || !this.clientSecret) {
      throw new Error('AMPLENOTE_CLIENT_ID and AMPLENOTE_CLIENT_SECRET must be set');
    }
  }

  getAuthUrl(state = null) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: 'notes tasks'
    });

    if (state) {
      params.append('state', state);
    }

    return `${AUTH_URL}?${params.toString()}`;
  }

  async exchangeCode(code) {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        code: code
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    const tokens = await response.json();
    await this.saveTokens(tokens);
    return tokens;
  }

  async refreshToken() {
    const tokens = await this.loadTokens();
    if (!tokens?.refresh_token) {
      throw new Error('No refresh token available. Please re-authenticate.');
    }

    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: tokens.refresh_token
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token refresh failed: ${error}`);
    }

    const newTokens = await response.json();
    await this.saveTokens(newTokens);
    return newTokens;
  }

  async getAccessToken() {
    const tokens = await this.loadTokens();
    if (!tokens) {
      throw new Error('Not authenticated. Run /amplenote:auth first.');
    }

    // Check if token is expired (with 5 min buffer)
    const expiresAt = tokens.expires_at || 0;
    const now = Date.now();

    if (now >= expiresAt - 5 * 60 * 1000) {
      const refreshed = await this.refreshToken();
      return refreshed.access_token;
    }

    return tokens.access_token;
  }

  async saveTokens(tokens) {
    // Calculate expiration time
    const expiresIn = tokens.expires_in || 7200; // Default 2 hours
    tokens.expires_at = Date.now() + expiresIn * 1000;

    await fs.writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2));
  }

  async loadTokens() {
    try {
      const data = await fs.readFile(TOKEN_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async isAuthenticated() {
    const tokens = await this.loadTokens();
    return tokens !== null;
  }
}

export function createOAuthHandler() {
  return new OAuthHandler();
}
