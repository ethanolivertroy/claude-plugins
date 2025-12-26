# Claude Plugins

A collection of Claude Code plugins.

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [ghost-content-plugin](./ghost-content-plugin/) | Manage Ghost blog content - create posts, sync drafts, push changes |

## Related Repositories

| Repository | Description |
|------------|-------------|
| [claude-grc-engineering](https://github.com/ethanolivertroy/claude-grc-engineering) | GRC Engineering plugin - NIST 800-53, FedRAMP, export controls, evidence collection |

## Installation

### From GitHub (Recommended)

```bash
# Add this marketplace (one-time)
/plugin marketplace add ethanolivertroy/claude-plugins

# Install the plugin
/plugin install ghost@ethanolivertroy-plugins
```

### Local Development

```bash
git clone https://github.com/ethanolivertroy/claude-plugins.git
claude --plugin-dir ./claude-plugins/ghost-content-plugin
```

## License

MIT
