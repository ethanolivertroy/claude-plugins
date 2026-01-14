#!/usr/bin/env node

import { createOAuthHandler } from '../src/auth.js';

const [,, command, ...args] = process.argv;

const oauth = createOAuthHandler();

async function main() {
  if (command === 'url' || !command) {
    // Generate authorization URL
    const authUrl = oauth.getAuthUrl();
    console.log('🔐 Amplenote OAuth Authentication\n');
    console.log('1. Open this URL in your browser:');
    console.log(`\n   ${authUrl}\n`);
    console.log('2. Authorize the application');
    console.log('3. Copy the authorization code from the redirect URL');
    console.log('4. Run: npm run auth callback <code>\n');
  } else if (command === 'callback') {
    // Exchange authorization code for tokens
    const code = args[0];
    if (!code) {
      console.error('Error: Authorization code required');
      console.error('Usage: npm run auth callback <code>');
      process.exit(1);
    }

    console.log('🔄 Exchanging authorization code for tokens...');
    const tokens = await oauth.exchangeCode(code);
    console.log('✅ Authentication successful!');
    console.log(`   Access token expires in: ${tokens.expires_in || 7200} seconds`);
  } else if (command === 'status') {
    // Check authentication status
    const isAuth = await oauth.isAuthenticated();
    if (isAuth) {
      console.log('✅ Authenticated with Amplenote');
      try {
        await oauth.getAccessToken();
        console.log('   Token is valid');
      } catch (error) {
        console.log('   Token may need refresh');
      }
    } else {
      console.log('❌ Not authenticated');
      console.log('   Run: npm run auth');
    }
  } else if (command === 'refresh') {
    // Manually refresh token
    console.log('🔄 Refreshing token...');
    await oauth.refreshToken();
    console.log('✅ Token refreshed successfully');
  } else {
    console.error(`Unknown command: ${command}`);
    console.error('Usage: npm run auth [url|callback|status|refresh]');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
