import { createOAuthHandler } from './auth.js';

const API_BASE = 'https://api.amplenote.com/v4';

export class AmplenoteClient {
  constructor() {
    this.oauth = createOAuthHandler();
  }

  async request(method, endpoint, body = null) {
    const token = await this.oauth.getAccessToken();

    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const url = `${API_BASE}${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API request failed (${response.status}): ${error}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  async get(endpoint) {
    return this.request('GET', endpoint);
  }

  async post(endpoint, body) {
    return this.request('POST', endpoint, body);
  }

  async put(endpoint, body) {
    return this.request('PUT', endpoint, body);
  }

  async delete(endpoint) {
    return this.request('DELETE', endpoint);
  }
}

export function createClient() {
  return new AmplenoteClient();
}
