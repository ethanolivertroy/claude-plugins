# Amplenote Plugin for Claude Code

Manage your Amplenote notes and tasks directly from the terminal.

## Features

- 📝 **Create notes** - Quick capture of ideas and information
- 📋 **Manage tasks** - Add tasks to existing notes
- 🔍 **Search notes** - Find notes in your knowledge base
- 🤖 **Autonomous assistant** - Natural language note management

## Prerequisites

- Claude Code CLI
- Node.js 18+
- Amplenote account with API access

### Getting API Access

1. Apply for API access at [amplenote.com/api_application_requests](https://www.amplenote.com/api_application_requests)
2. Wait for approval (usually within a few days)
3. You'll receive OAuth credentials (client_id, client_secret)

## Installation

### Setup

1. Clone and install:
   ```bash
   git clone https://github.com/ethanolivertroy/claude-plugins.git
   cd claude-plugins/amplenote-plugin
   npm install
   ```

2. Configure OAuth credentials:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. Authenticate:
   ```bash
   npm run auth
   # Follow the prompts to complete OAuth flow
   ```

4. Load in Claude Code:
   ```bash
   claude --plugin-dir /path/to/amplenote-plugin
   ```

## Commands

### `/amplenote:auth`
Manage OAuth authentication.
```
/amplenote:auth                    # Get auth URL
/amplenote:auth callback <code>    # Complete auth
/amplenote:auth status             # Check status
```

### `/amplenote:create-note`
Create a new note.
```
/amplenote:create-note "Meeting Notes"
/amplenote:create-note "Ideas" "Some initial content"
```

### `/amplenote:create-task`
Add a task to an existing note.
```
/amplenote:create-task <note-uuid> "Task description"
```

### `/amplenote:search`
Search your notes.
```
/amplenote:search "project planning"
```

## Autonomous Usage

The Amplenote assistant activates automatically:
```
You: "Create a note about the meeting we just had"
Claude: *Creates note with meeting details*

You: "Add a task to follow up with Sarah"
Claude: *Finds relevant note and adds task*
```

## Configuration

Create a `.env` file with your OAuth credentials:

```bash
AMPLENOTE_CLIENT_ID=your-client-id
AMPLENOTE_CLIENT_SECRET=your-client-secret
AMPLENOTE_REDIRECT_URI=http://localhost:3000/callback
```

## Authentication Flow

1. Run `/amplenote:auth` to get the authorization URL
2. Open the URL in your browser
3. Log in and authorize the application
4. Copy the code from the redirect URL
5. Run `/amplenote:auth callback <code>` to complete setup

Tokens are stored locally in `.amplenote-tokens.json` (gitignored) and automatically refreshed when expired.

## API Documentation

- [Amplenote API Docs](https://www.amplenote.com/api_documentation)
- [Plugin Development Guide](https://www.amplenote.com/help/developing_amplenote_plugins)

## License

MIT
