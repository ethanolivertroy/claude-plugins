![Claude Code Plugins Banner](./claude-plugins.jpg)

# My Claude Code Plugins

My personal collection of Claude Code plugins for enhancing productivity and workflow automation.

## My Plugins

| Plugin | Description |
|--------|-------------|
| [ghost-content-plugin](./ghost-content-plugin/) | Manage your Ghost blog content - create posts, sync drafts, push changes |
| [readwise-plugin](./readwise-plugin/) | Comprehensive Readwise integration - search your highlights, save content, analyze reading data, export highlights |
| [obsidian-plugin](./obsidian-plugin/) | AI-powered Obsidian.md vault management - create notes, search vault, suggest links, autonomous assistant |
| [ralph-loop-plugin](./ralph-loop-plugin/) | Continuous self-referential AI loops for iterative development |
| [typescript-lsp-plugin](./typescript-lsp-plugin/) | TypeScript/JavaScript language server for code intelligence |
| [rust-analyzer-lsp-plugin](./rust-analyzer-lsp-plugin/) | Rust language server for code intelligence and analysis |
| [amplenote-plugin](./amplenote-plugin/) | Amplenote integration - create notes, manage tasks, search your knowledge base |

## Installation

### From GitHub (Recommended)

```bash
# Add this marketplace (one-time)
# Note: Use HTTPS URL if you don't have SSH keys configured
/plugin marketplace add https://github.com/ethanolivertroy/claude-plugins

# Install Ghost plugin
/plugin install ghost@ethanolivertroy-plugins

# Install Readwise plugin
/plugin install readwise@ethanolivertroy-plugins

# Install Obsidian plugin
/plugin install obsidian@ethanolivertroy-plugins

# Install Ralph Loop plugin
/plugin install ralph-loop@ethanolivertroy-plugins

# Install TypeScript LSP plugin
/plugin install typescript-lsp@ethanolivertroy-plugins

# Install Rust Analyzer LSP plugin
/plugin install rust-analyzer-lsp@ethanolivertroy-plugins

# Install Amplenote plugin
/plugin install amplenote@ethanolivertroy-plugins
```

### Local Development

**Ghost Plugin:**
```bash
git clone https://github.com/ethanolivertroy/claude-plugins.git
cd claude-plugins/ghost-content-plugin
npm install
cd ..
claude --plugin-dir ./ghost-content-plugin
```

**Readwise Plugin:**
```bash
git clone https://github.com/ethanolivertroy/claude-plugins.git
# Build the MCP server first
cd claude-plugins/readwise-plugin/server
npm install && npm run build
cd ../..
claude --plugin-dir ./readwise-plugin
```

**Obsidian Plugin:**
```bash
git clone https://github.com/ethanolivertroy/claude-plugins.git
cd claude-plugins/obsidian-plugin
npm install
cd ..
claude --plugin-dir ./obsidian-plugin
```

## About

These are my personal Claude Code plugins that I've built to streamline my workflow. Feel free to use them as inspiration for your own plugins!

**Author**: Ethan Troy
**GitHub**: [@ethanolivertroy](https://github.com/ethanolivertroy)

## License

MIT
