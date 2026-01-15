# Getting Started with Kryon

Kryon is a universal UI framework that compiles to multiple targets from a single source. Write once in **Markdown**, TSX, Lua, Kry DSL, HTML, or C - deploy to desktop (SDL3/Raylib), web (HTML/CSS/JS), terminal (TUI), Android, or embedded systems.

## Quick Start

### Kry DSL

```kry
// hello.kry
App {
    windowTitle = "Hello Kryon"
    windowWidth = 800
    windowHeight = 600

    Container {
        width = 200
        height = 100
        backgroundColor = "#191970"
        contentAlignment = "center"

        Text {
            text = "Hello World"
            color = "yellow"
        }
    }
}
```

Run with: `kryon run hello.kry`

### Markdown

```markdown
<!-- hello.md -->
# Hello World

Welcome to **Kryon** - a universal UI framework.

## Features

- Cross-platform rendering
- Multiple frontends
- Fast compilation
```

Run with: `kryon run hello.md`

## Installation

### Using Nix (Recommended)

```bash
cd kryon
nix-shell
make build
make install   # Installs kryon CLI to ~/.local/bin
```

### Manual Installation

```bash
# Install Nim (>= 2.0)
curl https://nim-lang.org/choosenim/init.sh -sSf | sh

# Build C libraries and CLI
make build
make install
```

The `make install` command installs:
- `kryon` CLI to `~/.local/bin/`
- Shared libraries to `~/.local/lib/`

## CLI Commands

```bash
# Create new project
kryon new my-app                         # Creates project with kryon.toml

# Build applications
kryon build                              # Build from kryon.toml entry
kryon build index.tsx                    # Build specific file
kryon build README.md                    # Build markdown to web

# Run applications
kryon run                                # Build + start dev server
kryon run app.kir                        # Run pre-compiled KIR
kryon run README.md                      # Run markdown directly
kryon run README.md --renderer=terminal  # Render markdown to terminal

# Compile to KIR only
kryon compile index.tsx                  # Outputs .kryon_cache/index.kir
kryon compile README.md                  # Compile markdown to KIR
kryon compile index.tsx --output=app.kir # Custom output path

# Generate code from KIR
kryon codegen tsx app.kir app.tsx        # KIR → TypeScript
kryon codegen lua app.kir app.lua        # KIR → Lua
kryon codegen nim app.kir app.nim        # KIR → Nim
kryon codegen markdown app.kir app.md    # KIR → Markdown (round-trip)
kryon codegen kry app.kir app.kry        # KIR → Kry DSL

# Inspect KIR files
kryon inspect app.kir                    # Show component tree

# Compare KIR files
kryon diff old.kir new.kir               # Show differences

# Check configuration
kryon config show                        # Show kryon.toml settings
kryon config validate                    # Validate configuration

# System health check
kryon doctor                             # Check dependencies
```

## Rendering Backends

Rendering backends use Kryon's renderer to draw UI directly:

- **SDL3** - Modern cross-platform, hardware accelerated (default)
- **Raylib** - Alternative rendering backend with 3D support
- **Terminal** - Text-based UI using ANSI escape sequences

### Runtime Renderer Selection

Use the `--renderer` flag to select a rendering backend at runtime:

```bash
# Runtime renderer selection (recommended)
kryon run app.kry --renderer=sdl3     # SDL3 rendering (default)
kryon run app.kry --renderer=raylib   # Raylib rendering
kryon run app.kry --renderer=terminal # Terminal rendering

# Or set via environment variable
KRYON_RENDERER=raylib kryon run app.kry
```

Renderer priority: `--renderer` flag > `kryon.toml` config > environment variable > default (SDL3)

## Codegens (Transpilers)

Codegens generate source code for browsers or other frameworks to render:

- **HTML/Web** - Transpile to HTML/CSS/JavaScript for browsers
- **TSX** - Generate TypeScript React components
- **JSX** - Generate JavaScript React components

```bash
# Transpile to browser-ready HTML
kryon build --target web app.kry
```

## Frontend Support

| Frontend | Syntax | Runtime | Best For | Desktop | Terminal | Web |
|----------|--------|---------|----------|---------|----------|-----|
| Markdown | MD GFM | Compiled | Docs, simple UIs | ✅ | ✅ | ✅ |
| TSX/JSX | JSX | Bun + FFI | Web devs, rapid prototyping | ✅ | ✅ | ✅ |
| Lua | Tables | Lua VM | Scripting, hot-reload, modding | ✅ | ✅ | ✅ |
| C | Direct API | Compiled native | Max control, library integration | ✅ | ✅ | ✅ |
| Kry DSL | `.kry` | Compiled | Declarative UI | ✅ | ✅ | ✅ |

## Component Support

| Category | Components | Web | Desktop | Terminal |
|----------|------------|-----|---------|----------|
| **Layout** | Container, Column, Row, Center, Grid | ✅ | ✅ | ✅ |
| **Text** | Text, Heading, Paragraph, Code, Strong, Em | ✅ | ✅ | ⚠️ |
| **Input** | Button, Input, Textarea, Checkbox, Dropdown | ✅ | ✅ | ✅ |
| **Display** | Image, Link, Divider, Spacer | ✅ | ✅ | ⚠️ |
| **Navigation** | TabGroup, TabBar, Sidebar | ✅ | ✅ | ❌ |
| **Advanced** | Canvas, Markdown, Table | ✅ | ✅ | ❌ |

**Legend:** ✅ Fully Supported | ⚠️ Partial | ❌ Not Supported

## Features

- **Multiple frontends**: Markdown, TSX, Lua, C, HTML
- Declarative DSL syntax
- Multiple rendering backends (SDL3, Raylib, Terminal) and codegens (HTML/Web, TSX, JSX)
- Event handlers (onClick, onChange, onSubmit, etc.)
- Reactive state management
- Flexible layout system (Column, Row, Center, Grid)
- Rich components (Button, Input, Checkbox, Dropdown, Tabs)
- Styling (colors, borders, padding, fonts)
- Text rendering with custom fonts
- Mouse and keyboard input
- **Markdown with GFM support** - Write docs and UIs in Markdown with syntax highlighting
- **Component embedding** - Mix markdown with interactive UI components

## Visual Testing with kryon-test

Kryon includes **kryon-test**, a visual regression testing framework for automated screenshot-based testing.

```bash
# Build kryon-test
cd ../kryon-test
make

# Run tests
./build/kryon-test run configs/habits.yaml

# Generate baseline screenshots
./build/kryon-test baseline configs/habits.yaml

# GUI test runner for interactive verification
./build/kryon-test-gui configs/habits.yaml
```

Features:
- YAML-based test configuration
- Pixel-accurate screenshot comparison
- Wireframe mode for reactive components
- CLI and GUI test runners

See the [Testing documentation](/docs/testing) for complete details.

## Components

- **Container** - Generic container with styling, supports flexbox and grid layouts
- **Column** - Vertical flex layout with alignment options
- **Row** - Horizontal flex layout with alignment options
- **Center** - Centered layout
- **Text** - Text display with font styling
- **Button** - Clickable button with hover states
- **Input** - Text input field with focus and cursor
- **Textarea** - Multi-line text input
- **Checkbox** - Toggle checkbox with label
- **Dropdown** - Selection dropdown with keyboard navigation
- **Image** - Image display with sizing options
- **Link** - Navigation links
- **TabGroup/TabBar/Tab/TabContent** - Tab-based navigation

## Web Features

When targeting the web (HTML/CSS/JS), Kryon supports comprehensive HTML and CSS features including:

- **Layout**: Flexbox, CSS Grid
- **Typography**: Font sizes, weights, families, alignment, spacing
- **Colors**: Gradients, CSS variables
- **Effects**: Box shadows, transforms, opacity
- **Forms**: Buttons, inputs, textareas, selects, labels
- **Tables**: Full table structure with headers, bodies, and cells
- **Semantic HTML**: Headers, sections, articles, nav, aside, figure, etc.

See the [Web Features Reference](/docs/web-features) for complete HTML/CSS support details.
