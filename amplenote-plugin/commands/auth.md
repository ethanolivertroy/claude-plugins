Authenticate with Amplenote using OAuth.

Usage:
  /amplenote:auth              - Get authorization URL
  /amplenote:auth callback <code> - Exchange code for tokens
  /amplenote:auth status       - Check authentication status
  /amplenote:auth refresh      - Manually refresh token

Examples:
  /amplenote:auth
  /amplenote:auth callback abc123xyz
  /amplenote:auth status

This command manages OAuth authentication with Amplenote. You must complete authentication before using other commands.

Steps:
1. Run `/amplenote:auth` to get the authorization URL
2. Open the URL in your browser and authorize
3. Copy the code from the redirect URL
4. Run `/amplenote:auth callback <code>` to complete setup
