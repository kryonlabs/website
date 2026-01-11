# Getting Started with Kryon

Kryon is a universal UI framework that compiles to multiple targets from a single source. Write once in TSX, Lua, Kry DSL, HTML, or Markdown - deploy to desktop (SDL3/Raylib), web (HTML/CSS/JS), terminal (TUI), Android, or embedded systems.

## Quick Start

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

# Run applications
kryon run                                # Build + start dev server
kryon run app.kir                        # Run pre-compiled KIR

# Compile to KIR only
kryon compile index.tsx                  # Outputs .kryon_cache/index.kir
kryon compile index.tsx --output=app.kir # Custom output path

# Generate code from KIR
kryon codegen tsx app.kir app.tsx        # KIR → TypeScript
kryon codegen lua app.kir app.lua        # KIR → Lua
kryon codegen nim app.kir app.nim        # KIR → Nim
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

## Features

- Declarative DSL syntax
- Multiple rendering backends (SDL3, Raylib, Terminal) and codegens (HTML/Web, TSX, JSX)
- Event handlers (onClick, onChange, onSubmit, etc.)
- Reactive state management
- Flexible layout system (Column, Row, Center, Grid)
- Rich components (Button, Input, Checkbox, Dropdown, Tabs)
- Styling (colors, borders, padding, fonts)
- Text rendering with custom fonts
- Mouse and keyboard input

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

- **Container** - Generic container with styling
- **Text** - Text display
- **Button** - Clickable button with hover states
- **Input** - Text input field with focus and cursor
- **Checkbox** - Toggle checkbox with label
- **Dropdown** - Selection dropdown with keyboard navigation
- **Column** - Vertical layout with alignment options
- **Row** - Horizontal layout with alignment options
- **Center** - Centered layout
- **TabGroup/TabBar/Tab/TabContent** - Tab-based navigation
- **Link** - Navigation links
- **Markdown** - Render markdown content
