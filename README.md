# Claude Plugins

A collection of Claude Code plugins.

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [ghost-content-plugin](./ghost-content-plugin/) | Manage Ghost blog content - create posts, sync drafts, push changes |

## Installation

### From GitHub (Recommended)

```bash
# Add this marketplace (one-time)
/plugin marketplace add ethanolivertroy/claude-plugins

# Install the plugin
/plugin install ghost@ethanolivertroy/claude-plugins
```

### Local Development

```bash
git clone https://github.com/ethanolivertroy/claude-plugins.git
claude --plugin-dir ./claude-plugins/ghost-content-plugin
```

## License

MIT
