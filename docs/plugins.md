# Kryon Plugin System

Extend Kryon with custom components through the plugin architecture.

## Overview

Kryon's plugin system allows you to add new component types without modifying the core framework. Plugins can provide:

- **Custom components** - New UI elements beyond the built-in set
- **Custom renderers** - Specialized rendering for desktop, web, and other backends
- **Domain-specific functionality** - Markdown rendering, canvas drawing, charts, etc.

## How Plugins Work

Plugins register component renderers with Kryon's IR (Intermediate Representation) system. When Kryon encounters a component type it doesn't recognize, it delegates rendering to the appropriate plugin.

```
Your App (.kry/.nim/.tsx)
         │
         ▼
    Kryon IR Core
         │
    ┌────┴────┐
    ▼         ▼
Built-in   Plugin
Components Components
```

## Using Plugins

### Project Configuration

Declare plugin dependencies in your `kryon.toml`:

```toml
[project]
name = "my-app"

[plugins]
markdown = { path = "../kryon-plugin-markdown" }
canvas = { path = "../kryon-plugin-canvas" }
```

### In Your Code

Once declared, plugin components are available in your UI code:

```tsx
// TSX
<Markdown file="README.md" theme="dark" />
<Canvas width={400} height={300} />
```

```nim
# Nim
Markdown:
  file = "README.md"
  theme = "dark"
```

## Official Plugins

### Markdown Plugin

Rich markdown rendering with syntax highlighting, tables, and GitHub-flavored markdown support.

**Repository:** [github.com/kryonlabs/kryon-plugin-markdown](https://github.com/kryonlabs/kryon-plugin-markdown)

**Features:**
- CommonMark compliant
- Syntax highlighting for code blocks
- Tables, blockquotes, lists
- Dark and light themes
- Web and desktop rendering

**Usage:**
```tsx
<Markdown file="docs/guide.md" theme="dark" />
```

### Canvas Plugin

2D drawing canvas for custom graphics, charts, and visualizations.

**Repository:** [github.com/kryonlabs/kryon-plugin-canvas](https://github.com/kryonlabs/kryon-plugin-canvas)

**Features:**
- Drawing primitives (lines, rectangles, circles, paths)
- Fill and stroke styles
- Transformations
- Event handling for interactive graphics

**Usage:**
```tsx
<Canvas
  width={400}
  height={300}
  onDraw={(ctx) => {
    ctx.fillStyle = "#00A8FF";
    ctx.fillRect(10, 10, 100, 50);
  }}
/>
```

## Creating Plugins

Plugins are shared libraries that implement Kryon's plugin API.

### Plugin Structure

```
my-plugin/
├── src/
│   ├── my_plugin.c      # Plugin registration
│   └── my_renderer.c    # Component renderer
├── include/
│   └── my_plugin.h      # Public API
├── Makefile
└── README.md
```

### Registration

```c
#include "ir_plugin.h"

bool my_plugin_init(void) {
    IRPluginMetadata metadata = {
        .name = "my-plugin",
        .version = "1.0.0",
        .description = "My custom component",
        .command_id_start = 300,
        .command_id_end = 310,
    };

    ir_plugin_register(&metadata);
    ir_plugin_register_component_renderer(
        MY_COMPONENT_TYPE,
        my_component_renderer
    );

    return true;
}
```

### Web Renderer

For web target support, register a web renderer:

```c
char* my_web_renderer(const IRComponent* component, const char* theme) {
    // Return HTML string
    return strdup("<div class=\"my-component\">...</div>");
}

// In init:
ir_plugin_register_web_renderer(MY_COMPONENT_TYPE, my_web_renderer, my_css_generator);
```

## Resources

- [Plugin API Reference](https://github.com/kryonlabs/kryon/blob/master/ir/ir_plugin.h)
- [Markdown Plugin Source](https://github.com/kryonlabs/kryon-plugin-markdown)
- [Canvas Plugin Source](https://github.com/kryonlabs/kryon-plugin-canvas)
