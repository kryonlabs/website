# Kryon Plugin System

Extend Kryon with custom components through the plugin architecture.

## Overview

Kryon's plugin system allows you to add new component types without modifying the core framework. Plugins can provide:

- **Custom components** - New UI elements beyond the built-in set
- **Custom renderers** - Specialized rendering for desktop, web, and other backends
- **Domain-specific functionality** - Canvas drawing, flowcharts, etc.

## How Plugins Work

Plugins register component renderers with Kryon's IR (Intermediate Representation) system. When Kryon encounters a component type it doesn't recognize, it delegates rendering to the appropriate plugin.

```
Your App (.kry/.nim/.tsx)
         |
         v
    Kryon IR Core
         |
    +-----+----+
    v         v
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
flowchart = { path = "../kryon-flowchart" }
canvas = { path = "../kryon-canvas" }
```

### In Your Code

Once declared, plugin components are available in your UI code:

```tsx
// TSX
<Flowchart nodes={nodes} edges={edges} />
<Canvas width={400} height={300} />
```

```nim
# Nim
Flowchart:
  nodes = myNodes
  edges = myEdges
```

## Official Plugins

Kryon includes four official plugins that extend the framework's capabilities:

| Plugin | Description | Languages |
|--------|-------------|-----------|
| **Flowchart** | Flowchart and node diagrams with Mermaid syntax | C |
| **Syntax** | Syntax highlighting for code display | C |
| **Canvas** | Love2D-inspired immediate mode drawing | Nim, Lua |
| **Storage** | localStorage-like persistent storage | Nim, Lua, JS, TS |

### Flowchart Plugin

Create interactive flowcharts and diagrams with nodes and edges.

**Repository:** [github.com/kryonlabs/kryon-flowchart](https://github.com/kryonlabs/kryon-flowchart)

**Features:**
- Node-based diagram creation
- Customizable node shapes (rectangle, diamond, circle, etc.)
- Edge routing with labels
- Interactive pan and zoom
- Web and desktop rendering

**Usage:**
```tsx
<Flowchart
  nodes={[
    { id: "start", type: "circle", label: "Start" },
    { id: "process", type: "rectangle", label: "Process" },
    { id: "end", type: "circle", label: "End" }
  ]}
  edges={[
    { from: "start", to: "process" },
    { from: "process", to: "end" }
  ]}
/>
```

### Canvas Plugin

2D drawing canvas for custom graphics, charts, and visualizations.

**Repository:** [github.com/kryonlabs/kryon-canvas](https://github.com/kryonlabs/kryon-canvas)

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

### Syntax Plugin

Syntax highlighting library for code display in Kryon applications.

**Repository:** [github.com/kryonlabs/kryon-syntax](https://github.com/kryonlabs/kryon-syntax)

**Features:**
- Multiple language support: C-like, Python, Bash, JSON, Kryon
- Themable output with customizable color schemes
- Terminal and HTML renderers
- Lexical tokenization for accurate highlighting

**Supported Languages:**
- **C-like** - C, C++, Java, JavaScript, TypeScript
- **Python** - Python syntax highlighting
- **Bash** - Shell script highlighting
- **JSON** - JSON format highlighting
- **Kryon** - Kryon DSL (.kry files) highlighting

**Usage:**
```kry
@plugin syntax

Syntax {
    language = "python"
    code = '''
def hello():
    print("Hello, World!")
    '''
    theme = "monokai"
}
```

### Storage Plugin

localStorage-like persistent storage for Kryon applications.

**Repository:** [github.com/kryonlabs/kryon-storage](https://github.com/kryonlabs/kryon-storage)

**Features:**
- Simple key-value string storage
- Auto-save on every change
- JSON format storage files
- Cross-platform (Linux, macOS, Windows, WASM)
- Available for Nim, Lua, JavaScript, and TypeScript

**Usage:**
```lua
Storage.init("myapp")
Storage.setItem("username", "alice")
local name = Storage.getItem("username", "guest")
Storage.removeItem("username")
```

```nim
storage.init("myapp")
storage.setItem("username", "alice")
let name = storage.getItem("username", "guest")
storage.removeItem("username")
```

```typescript
import { Storage } from 'kryon-storage';

Storage.init('myapp');
Storage.setItem('username', 'alice');
const name = Storage.getItem('username', 'guest');
Storage.removeItem('username');
```

## Creating Plugins

Plugins are shared libraries that implement Kryon's plugin API.

### Plugin Structure

```
my-plugin/
+--- src/
|   +--- my_plugin.c      # Plugin registration
|   +--- my_renderer.c    # Component renderer
+--- include/
|   +--- my_plugin.h      # Public API
+--- Makefile
+--- README.md
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
- [Flowchart Plugin Source](https://github.com/kryonlabs/kryon-flowchart)
- [Canvas Plugin Source](https://github.com/kryonlabs/kryon-canvas)
