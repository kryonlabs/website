# Kryon Website

Official landing page for Kryon, built with Kryon itself using JavaScript.

## Overview

This website showcases Kryon by being built with Kryon! It demonstrates:
- JavaScript bindings for Kryon
- Component-based architecture
- Web target (HTML/CSS/JS generation)
- Project configuration with kryon.toml

## Project Structure

```
kryon-website/
├── kryon.toml          # Project configuration
├── index.js            # Main website file
├── dist/               # Build output (generated)
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── README.md           # This file
```

## Requirements

- [Kryon](https://github.com/kryonlabs/kryon) installed
- [Bun](https://bun.sh) runtime (v1.0.0+)

## Building

```bash
# Build for production
kryon build --target=web

# Development mode with hot reload
kryon dev index.js

# View configuration
kryon config show

# Validate configuration
kryon config validate
```

## Configuration

The website is configured via `kryon.toml`:

- **Target**: Web (HTML/CSS/JS)
- **Output**: `dist/` directory
- **Entry**: `index.js`
- **Frontend**: JavaScript
- **Optimization**: CSS/JS minification enabled

## Components

The website is built with reusable components:

- **Header**: Navigation and logo
- **Hero**: Landing section with CTA
- **Features**: 4 feature cards in grid
- **Workflow**: 3-step process diagram
- **Footer**: Links and copyright

## Deployment

After building, deploy the `dist/` directory to any static hosting:

```bash
# Build first
kryon build --target=web

# Deploy dist/ to your hosting provider
# e.g., Netlify, Vercel, GitHub Pages, etc.
```

## Development

To modify the website:

1. Edit `index.js` to change content/structure
2. Update `kryon.toml` for configuration changes
3. Run `kryon dev index.js` for live preview
4. Build with `kryon build --target=web`

## Design System

The website uses a consistent design system:

### Colors
- Background: `#0D1117`
- Primary Text: `#E6EDF3`
- Secondary Text: `#8B949E`
- Accent: `#00A8FF`
- Border: `#30363D`

### Spacing
- xs: 4px, sm: 8px, md: 16px
- lg: 24px, xl: 32px, xxl: 48px

## License

MIT License - see main Kryon repository for details.
