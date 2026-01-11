# CLI Reference

Complete reference for all Kryon CLI commands.

## Global Options

```bash
kryon --help              # Show help
kryon --version           # Show version info
```

## Commands

### new - Create Project

Creates a new Kryon project with boilerplate files.

```bash
kryon new <project-name>
```

**Generated files:**
- `kryon.toml` - Project configuration
- `index.tsx` - Main application entry
- `README.md` - Documentation
- `.gitignore` - Git ignore rules

**Example:**
```bash
kryon new my-app
cd my-app
kryon build
```

---

### build - Build Project

Orchestrates the build pipeline: Source → KIR → Target Output.

```bash
kryon build [source-file]
```

**Options:**
- If no file specified, uses `build.entry` from `kryon.toml`
- Multi-page builds use `build.pages` array

**Supported frontends (auto-detected):**
| Extension | Frontend |
|-----------|----------|
| `.tsx`, `.jsx` | TypeScript/React |
| `.html` | HTML |
| `.md` | Markdown |
| `.kry` | Kry DSL |
| `.lua` | Lua |
| `.nim` | Nim |
| `.c` | C |

**Example:**
```bash
kryon build                    # Build from kryon.toml
kryon build index.tsx          # Build specific file
```

---

### run - Run Application

Builds and runs the application with appropriate backend.

```bash
kryon run [source-file] [options]
```

**Targets:**
- `web` - Builds HTML and starts dev server
- `desktop` - Opens SDL3 window (default)
- `terminal` - Renders to terminal (TUI)
- `android` - Builds and runs on Android device

**Renderer Selection (Desktop):**
```bash
# Runtime renderer selection (for desktop target)
kryon run app.kry --renderer=sdl3     # SDL3 rendering (default)
kryon run app.kry --renderer=raylib   # Raylib rendering
kryon run app.kry --renderer=terminal # Terminal rendering

# Or set via environment variable
KRYON_RENDERER=raylib kryon run app.kry
```

Renderer priority: `--renderer` flag > `kryon.toml` config > environment variable > default (SDL3)

**Example:**
```bash
kryon run                      # Desktop with SDL3 (default)
kryon run --target=desktop     # Desktop window
kryon run --target=web         # Web dev server
kryon run --target=terminal    # Terminal UI
kryon run --renderer=raylib    # Desktop with Raylib
```

---

### compile - Compile to KIR

Compiles source to KIR without code generation.

```bash
kryon compile <source-file> [options]
```

**Options:**
- `--output=<path>` - Custom output path
- `--no-cache` - Don't use `.kryon_cache/`

**Example:**
```bash
kryon compile index.tsx                          # → .kryon_cache/index.kir
kryon compile index.tsx --output=build/app.kir   # → build/app.kir
```

---

### codegen - Generate Code

Generates source code from KIR files.

```bash
kryon codegen <language> <input.kir> <output>
```

**Supported languages:**
| Language | Output |
|----------|--------|
| `tsx` | TypeScript React |
| `lua` | Lua DSL |
| `nim` | Nim DSL |
| `kry` | Kry DSL |
| `c` | C code |
| `markdown` | Markdown |

**Example:**
```bash
kryon codegen tsx app.kir app.tsx
kryon codegen lua app.kir app.lua
kryon codegen kry app.kir app.kry
```

---

### inspect - Analyze KIR

Displays detailed analysis of KIR files.

```bash
kryon inspect <file.kir>
```

**Shows:**
- Component tree with IDs and types
- Properties and styling
- Event handlers
- Layout dimensions

**Example:**
```bash
kryon inspect app.kir
```

---

### diff - Compare KIR Files

Compares two KIR files and shows differences.

```bash
kryon diff <file1.kir> <file2.kir>
```

**Output:**
- Red `-` for components only in file1
- Green `+` for components only in file2
- Yellow for modified properties

**Example:**
```bash
kryon diff old.kir new.kir
```

---

### config - Configuration

Shows or validates project configuration.

```bash
kryon config [show|validate]
```

**Subcommands:**
- `show` - Display current configuration
- `validate` - Check configuration validity

**Example:**
```bash
kryon config              # Show config
kryon config validate     # Validate config
```

---

### doctor - System Check

Checks system dependencies and configuration.

```bash
kryon doctor
```

**Checks:**
- Kryon libraries (libkryon_ir, libkryon_desktop)
- SDL3 library
- Bun runtime
- Display environment (X11/Wayland)
- CLI installation

---

## Testing with kryon-test

For visual regression testing, use the separate **kryon-test** tool included with Kryon.

```bash
# From the kryon-test directory
cd kryon-test
make

# Run tests
./build/kryon-test run configs/habits.yaml

# Generate baseline screenshots
./build/kryon-test baseline configs/habits.yaml

# GUI test runner
./build/kryon-test-gui configs/habits.yaml
```

See the [Testing documentation](/docs/testing) for complete details on visual regression testing.

---

## Configuration (kryon.toml)

```toml
[project]
name = "my-app"
version = "1.0.0"
author = "Your Name"
description = "My Kryon app"

[build]
entry = "index.tsx"              # Main entry point
target = "web"                   # Build target
output_dir = "dist"              # Output directory
frontend = "tsx"                 # Override frontend detection

# Multi-page builds
pages = [
  {name = "home", route = "/", source = "index.tsx"},
  {name = "docs", route = "/docs", source = "docs/index.tsx"}
]

[build.optimization]
enabled = true
minify_css = true
minify_js = true
tree_shake = true

[dev]
hot_reload = true
port = 3000
auto_open = true
watch_paths = ["src/**", "*.tsx"]

[window]
title = "My App"
width = 1200
height = 900
resizable = true

[desktop]
renderer = "sdl3"                # or "raylib"

[web]
renderer = "static"
generate_separate_files = true
include_js_runtime = false
```

## Environment Variables

```bash
# Renderer selection
KRYON_RENDERER=sdl3|raylib|terminal|web    # Override renderer

# Paths
KRYON_LIB_PATH=/path/to/libs               # Library search path
LD_LIBRARY_PATH=/path/to/libs              # Standard library path

# Debug
DEBUG=1                                    # Enable debug output
```

**Note:** The `--renderer` flag takes precedence over the `KRYON_RENDERER` environment variable.

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Error (file not found, build failed, etc.) |

## File Extensions

| Extension | Type |
|-----------|------|
| `.tsx`, `.jsx` | TypeScript/React source |
| `.kry` | Kry DSL source |
| `.lua` | Lua source |
| `.html` | HTML source |
| `.md` | Markdown source |
| `.nim` | Nim source |
| `.c` | C source |
| `.kir` | KIR intermediate (JSON) |
| `.kirb` | KIR binary (packed) |
