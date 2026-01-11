# Codegens (Transpilers)

Codegens are transpilation targets that convert Kryon IR to source code for other frameworks or browsers. Unlike rendering backends (SDL3, Terminal) that use Kryon's renderer to draw UI, codegens generate code that other systems render.

## Architecture

**Language Bindings** → **KIR Pipeline** → **Codegens** → **Output Code**

Codegens:
1. Load compiled `.kir` or `.kirb` files
2. Transform IR components to target format
3. Generate source code files
4. Output is rendered by browser/framework, not Kryon

## Available Codegens

| Codegen  | Output Format        | Use Case              | Status      |
|----------|---------------------|-----------------------|-------------|
| HTML/Web | HTML/CSS/JS files   | Browser apps, Sites   | Production  |
| TSX      | TypeScript/React    | React apps            | Production  |
| Lua      | Lua code            | Lua frameworks        | Production  |
| Nim      | Nim DSL             | Nim applications      | Production  |
| Kry      | Kry DSL             | Roundtrip conversion  | Production  |
| C        | C code              | Native integration    | Partial     |
| Markdown | Markdown            | Documentation         | Production  |

## HTML/Web Codegen

The HTML/Web codegen transpiles Kryon IR to browser-ready HTML, CSS, and JavaScript.

### Location

`/codegens/web/` - C library for HTML/CSS/JS generation

### Key Files

- `html_generator.c/h` - HTML structure generation
- `css_generator.c/h` - CSS styling and flexbox
- `svg_generator.c/h` - SVG graphics
- `ir_web_renderer.c/h` - Main transpiler interface

### Usage

```bash
# Run with HTML codegen
KRYON_RENDERER=web kryon run app.kry

# Or use shorthand
kryon run app.tsx --target web

# Outputs:
# - app.html
# - app.css (if external CSS)
# - app.js (event handlers)
```

### Generated Output

**Input (app.kry):**
```kry
App {
    windowTitle = "Hello"

    Container {
        width = 200
        height = 100
        backgroundColor = "#191970"

        Text {
            text = "Hello World"
            color = "yellow"
        }
    }
}
```

**Output (app.html):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello</title>
    <link rel="stylesheet" href="app.css">
</head>
<body>
    <div class="kryon-container" style="width: 200px; height: 100px; background-color: #191970;">
        <span class="kryon-text" style="color: yellow;">Hello World</span>
    </div>
</body>
</html>
```

**Output (app.css):**
```css
.kryon-container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.kryon-text {
    font-family: system-ui;
}
```

### Features

**Supported:**
- ✅ All layout components (Container, Column, Row, Center)
- ✅ Text rendering with custom styles
- ✅ Buttons with hover states
- ✅ Images with proper sizing
- ✅ Flexbox layout (gap, alignment, wrapping)
- ✅ CSS styling (colors, borders, padding, radius)
- ✅ Responsive layouts
- ✅ SVG graphics

**Limitations:**
- ⚠️ Event handlers generate placeholder JS (requires manual implementation)
- ⚠️ State management not included
- ⚠️ No hot reload (regenerate HTML on changes)

### Configuration

```bash
# Inline CSS (single HTML file)
KRYON_WEB_INLINE_CSS=1 kryon run app.kry --target web

# Minify output
KRYON_WEB_MINIFY=1 kryon run app.kry --target web

# Preserve component IDs for debugging
KRYON_WEB_DEBUG=1 kryon run app.kry --target web
```

### Example: Complete Website

**Input (website.tsx):**
```tsx
<column padding={40} backgroundColor="#f5f5f5">
  {/* Header */}
  <row gap={20} padding={20} backgroundColor="white">
    <image src="logo.png" width={50} height={50} />
    <text fontSize={24} fontWeight="bold">My Website</text>
  </row>

  {/* Content */}
  <column gap={30} padding={40}>
    <text fontSize={32}>Welcome</text>
    <text fontSize={16} color="#666">
      Build UIs with Kryon and transpile to HTML
    </text>

    <button
      title="Get Started"
      width={200}
      height={50}
      backgroundColor="#3498db"
      color="white"
    />
  </column>
</column>
```

**Command:**
```bash
kryon run website.tsx --target web --output=dist/
```

**Output:**
```
dist/
├── index.html
├── styles.css
└── assets/
    └── logo.png
```

### Integration with Build Tools

**Vite:**
```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'kryon',
      transform(src, id) {
        if (id.endsWith('.kry')) {
          // Transpile .kry to HTML
          return kryonTranspile(src)
        }
      }
    }
  ]
})
```

**Webpack:**
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.kry$/,
        use: 'kryon-loader'
      }
    ]
  }
}
```

## TSX Codegen

Generate TypeScript React components from Kryon IR.

### Usage

```bash
kryon codegen tsx app.kir app.tsx
```

### Example

**Input (app.kir):** KIR component tree

**Output (app.tsx):**
```tsx
import { kryonApp } from "kryon";

export default kryonApp({
  title: "App",
  width: 800,
  height: 600,
  render: () => {
    return (
      <Column gap={20}>
        <Text text="Hello World" color="#ffffff" />
        <Button text="Click Me" onClick={() => console.log("clicked")} />
      </Column>
    );
  }
});
```

## Lua Codegen

Generate Lua code with Kryon DSL bindings.

```bash
kryon codegen lua app.kir app.lua
```

### Example Output

```lua
local UI = require("kryon.dsl")
local Reactive = require("kryon.reactive")

local root = UI.Column {
  gap = 20,
  UI.Text { text = "Hello World", color = "#ffffff" },
  UI.Button { text = "Click Me" }
}

return { root = root }
```

## Nim Codegen

Generate Nim DSL code.

```bash
kryon codegen nim app.kir app.nim
```

### Example Output

```nim
import kryon_dsl

let app = kryonApp:
  Body:
    Column:
      gap = 20
      Text:
        text = "Hello World"
        color = "#ffffff"
      Button:
        text = "Click Me"
```

## Kry Codegen

Roundtrip conversion - convert KIR back to Kry DSL.

```bash
kryon codegen kry app.kir app.kry
```

### Example Output

```kry
App {
  windowTitle = "App"
  windowWidth = 800
  windowHeight = 600

  Column {
    gap = 20

    Text {
      text = "Hello World"
      color = "#ffffff"
    }

    Button {
      text = "Click Me"
    }
  }
}
```

## C Codegen

Generate C code using Kryon C API.

```bash
kryon codegen c app.kir app.c
```

### Example Output

```c
#include "kryon.h"

int main() {
    kryon_init("App", 800, 600);

    IRComponent* col = kryon_column();
    kryon_set_gap(col, 20);

    IRComponent* text = kryon_text("Hello World");
    kryon_set_color(text, 255, 255, 255, 255);
    kryon_add_child(col, text);

    IRComponent* btn = kryon_button("Click Me");
    kryon_add_child(col, btn);

    kryon_run(col);
    return 0;
}
```

## Markdown Codegen

Convert KIR to Markdown format.

```bash
kryon codegen markdown app.kir app.md
```

## Implementation Guide

### Creating a New Codegen

1. **Create codegen directory:**
```bash
mkdir -p codegens/my-codegen
```

2. **Implement transpiler interface:**
```c
// codegens/my-codegen/my_codegen.h
#ifndef MY_CODEGEN_H
#define MY_CODEGEN_H

#include "../../ir/ir_core.h"

// Generate code from IR
char* my_codegen_generate(IRComponent* root);

// Write to file
bool my_codegen_write_file(IRComponent* root, const char* output_path);

#endif
```

3. **Implement code generation:**
```c
// codegens/my-codegen/my_codegen.c
#include "my_codegen.h"

char* my_codegen_generate(IRComponent* root) {
    // Transform IR to target format
    // Return generated code string
}
```

4. **Add to build system:**
```makefile
# codegens/my-codegen/Makefile
MY_CODEGEN_SOURCES = my_codegen.c
MY_CODEGEN_LIB = $(BUILD_DIR)/libkryon_my_codegen.a

all: $(MY_CODEGEN_LIB)
```

5. **Register with CLI:**
```nim
# cli/main.nim
when defined(myCodegenBackend):
  import my_codegen_bindings
```

### Codegen Best Practices

1. **Load IR from .kirb format** - Efficient binary format
2. **Generate idiomatic code** - Follow target language conventions
3. **Preserve component structure** - Map IR tree to output structure
4. **Handle edge cases** - Invalid IR, missing properties, etc.
5. **Minify optionally** - Provide minification option for production
6. **Add source maps** - For debugging generated code

## CLI Commands

```bash
# Run with specific codegen
kryon run app.kry --target web

# Transpile without running
kryon transpile app.kry --target web --output dist/

# Compare codegens
kryon transpile app.kry --target web --output web/
kryon transpile app.kry --target tsx --output react/

# Debug codegen output
kryon transpile app.kry --target web --debug
```

## Environment Variables

```bash
# Choose codegen
KRYON_CODEGEN=web kryon run app.kry

# Codegen-specific options
KRYON_WEB_INLINE_CSS=1      # Inline CSS in HTML
KRYON_WEB_MINIFY=1          # Minify output
KRYON_WEB_DEBUG=1           # Preserve IDs, add comments
KRYON_TSX_FUNCTIONAL=1      # Use functional components (planned)
```

## Comparison: Rendering Backends vs Codegens

| Feature              | Rendering Backend   | Codegen              |
|---------------------|---------------------|----------------------|
| **Purpose**         | Draw UI directly    | Generate source code |
| **Examples**        | SDL3, Terminal      | HTML/Web, TSX, JSX   |
| **Output**          | Pixels on screen    | Source code files    |
| **Runtime**         | Uses Kryon renderer | Browser/framework renders |
| **Performance**     | Native speed        | Depends on target    |
| **Deployment**      | Standalone binary   | Web hosting, CDN     |

## Use Cases

### HTML/Web Codegen

- **Static websites** - Blog, portfolio, documentation
- **Landing pages** - Marketing sites
- **Dashboards** - Data visualization, admin panels
- **Embedded web views** - In desktop apps

### TSX/JSX Codegen (Planned)

- **React integration** - Use Kryon layouts in React apps
- **Component libraries** - Share UI across projects
- **Design systems** - Generate components from design files

### Lua Codegen (Planned)

- **Game UIs** - LÖVE, Defold, etc.
- **Scripting** - Embedded UIs in Lua apps

### C Codegen (Planned)

- **Native integration** - GTK, Qt bindings
- **Embedded systems** - Direct C output for MCUs

## Troubleshooting

### HTML codegen output looks wrong

**Check:**
- Verify KIR is valid: `kryon tree app.kir`
- Inspect generated CSS for layout issues
- Enable debug mode: `KRYON_WEB_DEBUG=1`

### Generated code doesn't match expected output

**Solution:**
- Check IR compilation: KIR → KIRB → Codegen
- Validate IR: `kryon validate app.kir`
- Test with minimal example first

### Codegen missing features

**Workaround:**
- Use rendering backend for missing features
- Or post-process generated code manually
- Or contribute codegen improvements

## Next Steps

- See [Architecture](./architecture.md) for system overview
- See [IR Pipeline](./ir-pipeline.md) for compilation details
- See [Contributing](./contributing.md) to add new codegens
