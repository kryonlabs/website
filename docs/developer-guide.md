# Kryon IR Developer Guide

**Version:** 2.0

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Building from Source](#building-from-source)
4. [IR Compilation Pipeline](#ir-compilation-pipeline)
5. [Working with Reactive State](#working-with-reactive-state)
6. [Hot Reload Development](#hot-reload-development)
7. [CLI Tools](#cli-tools)
8. [Frontend Development](#frontend-development)
9. [Backend Development](#backend-development)
10. [Testing](#testing)
11. [Best Practices](#best-practices)

## Introduction

Kryon is a cross-platform UI framework with an intermediate representation (IR) layer that enables:

- **Multi-frontend support**: Write UIs in Nim, Lua, C, or TypeScript
- **Multi-backend rendering**: SDL3, terminal, web (same IR for all)
- **Hot reload with state preservation**: Change code without losing app state
- **Efficient serialization**: Compact binary format for fast load times
- **Reactive programming**: Automatic UI updates when state changes

This guide focuses on the IR compilation pipeline and tooling introduced in v2.0.

## Architecture Overview

```
+--------------------------------------------------------------+
|                    Frontend Layer                           |
|  +-----------+  +-----------+  +-----------+  +-----------+   |
|  |   Nim    |  |   Lua    |  |    C     |  |   TS/JS  |   |
|  |   DSL    |  |  Bindings|  |  Builder |  | Bindings |   |
|  +-----+-----+  +-----+-----+  +-----+-----+  +-----+-----+   |
|       |             |             |             |           |
|       +--------------+-------------+-------------+           |
|                          |                                   |
+---------------------------+-----------------------------------+
                           v
+--------------------------------------------------------------+
|                  IR Layer (Core)                            |
|  +-----------------------------------------------------+    |
|  |  Component Tree (IRComponent)                      |    |
|  |   - Layout (flexbox, alignment, spacing)           |    |
|  |   - Style (colors, fonts, animations, filters)     |    |
|  |   - Events (click, hover, focus, custom)           |    |
|  |   - Reactive Manifest (state, bindings)            |    |
|  +-----------------------------------------------------+    |
|                          |                                   |
|  +-----------------------------------------------------+    |
|  |  IR Serialization (.kir binary format)            |    |
|  |   - Compression, validation, checksumming          |    |
|  |   - Hot reload state preservation                  |    |
|  +-----------------------------------------------------+    |
+---------------------------+-----------------------------------+
                           v
+--------------------------------------------------------------+
|                 Backend Layer                               |
|  +-----------+  +-----------+  +-----------+  +-----------+   |
|  |  SDL3    |  | Terminal |  |   Web    |  |  Custom  |   |
|  | Graphics |  |   TUI    |  | Canvas   |  | Renderer |   |
|  +-----------+  +-----------+  +-----------+  +-----------+   |
+--------------------------------------------------------------+
```

### Key Components

- **IR Builder** (`ir/ir_builder.c`) - Creates and manages component trees
- **IR Serialization** (`ir/ir_serialization.c`) - Binary format encoding/decoding
- **IR Validation** (`ir/ir_validation.c`) - Format checking and integrity
- **Reactive Manifest** (`ir/ir_reactive_manifest.c`) - State management
- **CLI Tools** (`cli/`) - Compilation, inspection, debugging tools

## Building from Source

### Prerequisites

```bash
# Required
- C99 compiler (gcc, clang)
- Nim 2.0+
- Make
- pkg-config

# For desktop backend
- SDL3 development libraries
- SDL3_ttf development libraries
- HarfBuzz, FreeType, Fribidi

# For Lua frontend
- LuaJIT

# Optional
- nix (for reproducible builds)
```

### Build Steps

```bash
# Clone repository
git clone https://github.com/yourorg/kryon.git
cd kryon

# Build IR library
make -C ir all

# Build desktop backend
make -C backends/desktop all

# Build CLI tool
nimble build

# Install (optional)
make install  # Installs to ~/.local
```

### Build Outputs

```
build/
+--- libkryon_ir.a          # Static IR library
+--- libkryon_ir.so         # Shared IR library
+--- libkryon_desktop.a     # Desktop backend library

bin/cli/
+--- kryon                   # CLI executable
```

## IR Compilation Pipeline

### Overview

The compilation pipeline transforms high-level frontend code into optimized IR:

```
Source Code (.nim, .lua, .c)
         |
    DSL/API Calls
         |
  IR Tree Construction
         |
   Optimization Pass
         |
  Serialization (.kir)
         |
    Validation
         |
   Cached IR File
```

### Compilation with Caching

```bash
# Compile Nim source to IR
kryon compile myapp.nim

# Compile with caching disabled
kryon compile myapp.nim --no-cache

# Compile with validation
kryon compile myapp.nim --validate

# Include reactive manifest
kryon compile myapp.nim --with-manifest
```

The compiler:
1. Computes hash of source file
2. Checks `.kryon_cache/index.json` for cached IR
3. If cache hit and source unchanged, returns cached IR
4. Otherwise, compiles source and updates cache
5. Optionally validates output format

### Cache Structure

```
.kryon_cache/
+--- index.json                    # Cache index
+--- nimcache/                     # Nim compilation artifacts
+--- <hash>.kir                    # Cached IR files
```

**index.json format:**
```json
{
  "/path/to/myapp.nim": {
    "hash": "a1b2c3d4",
    "irFile": ".kryon_cache/a1b2c3d4.kir",
    "timestamp": 1701360000,
    "componentCount": 42
  }
}
```

### Programmatic Compilation

```nim
import cli/compile

let opts = CompileOptions(
  sourceFile: "myapp.nim",
  outputFile: "myapp.kir",
  frontend: "nim",
  enableCache: true,
  enableValidation: true,
  includeManifest: true,
  verboseOutput: false
)

let result = compile(opts)
if result.success:
  echo "Compiled: ", result.componentCount, " components"
  echo "IR file: ", result.irFile
else:
  for err in result.errors:
    echo "Error: ", err
```

## Working with Reactive State

### Exporting Reactive State

Reactive state must be explicitly exported to be preserved during hot reload:

```nim
import bindings/nim/reactive_system

# Named reactive variables are automatically tracked
var counter = namedReactiveVar("counter", 0)
var userName = namedReactiveVar("userName", "Guest")

# Build UI using reactive vars
Container:
  Text:
    content = fmt"Count: {counter.value}"
  Button:
    title = "Increment"
    onClick = proc() = counter.value += 1
```

### Reactive Manifest

The reactive manifest captures:
- **Variables**: Name, type, current value, version
- **Bindings**: Which components use which variables
- **Conditionals**: Visibility state, suspended flag
- **For Loops**: Collection state, generated children

```nim
# Export manifest with IR
let manifest = exportReactiveManifest()
discard ir_write_binary_file_with_manifest(root, manifest, "app.kir")

# Load with manifest
var restoredManifest: ptr IRReactiveManifest
let root = ir_read_binary_file_with_manifest("app.kir", addr restoredManifest)

# Restore reactive state
if restoredManifest != nil:
  restoreReactiveState(restoredManifest)
```

### State Preservation

During hot reload:
1. Current reactive values are serialized to manifest
2. Code is recompiled
3. New IR tree is loaded
4. Reactive state is restored from manifest
5. UI reflects preserved state

## Hot Reload Development

### Development Mode

```bash
# Start dev mode with hot reload
kryon dev myapp.nim

# Edit myapp.nim and save
# App automatically reloads with state preserved
```

### How Hot Reload Works

```
+----------------------------------------------+
| 1. Detect file change (inotify/polling)    |
+-------------------+--------------------------+
                   v
+----------------------------------------------+
| 2. Export current reactive state            |
|    let manifest = exportReactiveManifest()  |
+-------------------+--------------------------+
                   v
+----------------------------------------------+
| 3. Recompile source                         |
|    nim c --app:lib myapp.nim                |
+-------------------+--------------------------+
                   v
+----------------------------------------------+
| 4. Execute to generate new IR tree          |
|    let newRoot = runCompiledApp()           |
+-------------------+--------------------------+
                   v
+----------------------------------------------+
| 5. Restore reactive state                   |
|    restoreReactiveState(manifest)           |
+-------------------+--------------------------+
                   v
+----------------------------------------------+
| 6. Re-render with new tree + old state      |
|    render(newRoot)                          |
+----------------------------------------------+
```

### Environment Variables

```bash
# Enable hot reload mode
KRYON_HOT_RELOAD=1

# Source file to watch
KRYON_HOT_RELOAD_FILE=myapp.nim

# Rebuild command
KRYON_HOT_RELOAD_CMD="nim c myapp.nim"

# Enable debug tracing
KRYON_TRACE_LAYOUT=1
KRYON_TRACE_COMPONENTS=1
```

## CLI Tools

### Compilation

```bash
# Compile to IR
kryon compile app.nim

# With options
kryon compile app.nim --output=build/app.kir --validate --no-cache
```

### Validation

```bash
# Validate IR format
kryon validate app.kir

# Output:
# [OK] IR file is valid
#    [PUZZLE] Components: 42
#    [CHART] Reactive state:
#       Variables: 5
#       Bindings: 12
```

### Inspection

```bash
# Quick metadata
kryon inspect-ir app.kir

# Detailed analysis
kryon inspect-detailed app.kir --tree --max-depth=5

# Just the tree
kryon tree app.kir

# JSON output
kryon inspect-detailed app.kir --json > analysis.json
```

### Diffing

```bash
# Compare two IR files
kryon diff old_version.kir new_version.kir

# Output:
# [CHART] Comparing IR files...
# [FAIL] Files differ (3 differences)
#
# Component counts:
#   File 1: 42 components
#   File 2: 45 components
#   Delta: +3
#
# Differences:
#   1. root/0 [type]: CONTAINER -> ROW
#   2. root/1 [child_count]: 2 -> 3
#   3. Reactive variables: 5 -> 6
```

### Running Applications

```bash
# Run Nim app
kryon run myapp.nim

# Run with specific backend
kryon run myapp.nim --target=sdl3

# Development mode with hot reload
kryon dev myapp.nim
```

## Frontend Development

### Nim DSL

The Nim DSL provides a declarative syntax for building UIs:

```nim
import bindings/nim/kryon_dsl

# Reactive state
var count = namedReactiveVar("count", 0)

# Build UI
Container:
  width = 100.percent
  height = auto
  layoutDirection = 1  # Column
  padding = (10, 10, 10, 10)

  Text:
    content = fmt"Counter: {count.value}"
    fontSize = 24
    color = rgb(255, 255, 255)

  Button:
    title = "Increment"
    onClick = proc() =
      count.value += 1
      echo "New count: ", count.value
```

### Lua API

```lua
local kryon = require('kryon')

-- Create reactive var
local count = kryon.reactive(0)

-- Build UI
local app = kryon.app {
  container {
    width = kryon.percent(100),
    text {
      content = function() return "Count: " .. count.value end
    },
    button {
      title = "Increment",
      onClick = function()
        count.value = count.value + 1
      end
    }
  }
}

-- Save to IR
kryon.saveIR(app, 'app.kir')
```

### C Builder API

```c
#include "ir_builder.h"

// Create context
IRContext* ctx = ir_create_context();
ir_set_context(ctx);

// Build tree
IRComponent* root = ir_create_component(IR_COMPONENT_CONTAINER);
ir_set_dimensions(root, ir_percent(100), ir_auto());

IRComponent* text = ir_create_component(IR_COMPONENT_TEXT);
ir_set_text_content(text, "Hello, World!");
ir_add_child(root, text);

// Serialize
ir_write_binary_file(root, "app.kir");

// Cleanup
ir_destroy_component(root);
ir_destroy_context(ctx);
```

## Backend Development

### Implementing a Custom Backend

To create a new backend renderer:

1. **Implement IRRenderer Interface**

```c
typedef struct {
    bool (*init)(IRRendererConfig* config);
    bool (*render)(IRComponent* root);
    void (*cleanup)(void);
    void (*handleEvents)(void);
} IRRenderer;
```

2. **Register Renderer**

```c
IRRenderer my_renderer = {
    .init = my_backend_init,
    .render = my_backend_render,
    .cleanup = my_backend_cleanup,
    .handleEvents = my_backend_handle_events
};

ir_register_renderer("my_backend", &my_renderer);
```

3. **Implement Rendering Functions**

```c
bool my_backend_render(IRComponent* root) {
    // Traverse component tree
    render_component(root);

    // Recurse into children
    for (uint32_t i = 0; i < root->child_count; i++) {
        my_backend_render(root->children[i]);
    }

    return true;
}
```

4. **Use Your Backend**

```bash
KRYON_RENDERER=my_backend kryon run app.nim
```

## Testing

### Unit Tests

```bash
# Test IR serialization
make -C ir/tests test_serialization

# Test reactive manifest
make -C ir/tests test_reactive_manifest

# Test validation
make -C ir/tests test_validation
```

### Integration Tests

```bash
# Test compilation pipeline
nim c -r tests/test_compile.nim

# Test hot reload
nim c -r tests/test_hot_reload.nim
```

### Test Structure

```nim
import unittest
import ir_serialization

test "roundtrip serialization":
  # Create component tree
  let root = ir_create_component(IR_COMPONENT_CONTAINER)

  # Serialize
  let buffer = ir_serialize_binary(root)
  check buffer != nil

  # Deserialize
  let restored = ir_deserialize_binary(buffer)
  check restored != nil
  check restored.component_type == IR_COMPONENT_CONTAINER

  # Cleanup
  ir_destroy_component(root)
  ir_destroy_component(restored)
  ir_buffer_destroy(buffer)
```

## Best Practices

### Performance

1. **Use Caching** - Enable compilation caching for faster rebuilds
2. **Minimize Reactive Dependencies** - Only use reactive vars where needed
3. **Batch Updates** - Group multiple state changes together
4. **Lazy Evaluation** - Use conditionals to avoid unnecessary work

### Code Organization

```
myproject/
+--- src/
|   +--- main.nim              # Application entry point
|   +--- components/           # Reusable components
|   |   +--- button.nim
|   |   +--- card.nim
|   +--- screens/              # App screens/pages
|   |   +--- home.nim
|   |   +--- settings.nim
|   +--- state/                # Global state management
|       +--- app_state.nim
+--- build/                    # Build artifacts
|   +--- app.kir               # Compiled IR
+--- .kryon_cache/             # Compilation cache
+--- kryon.nimble              # Project configuration
```

### State Management

```nim
# Good: Named reactive vars for persistence
var userProfile = namedReactiveVar("userProfile", defaultProfile)

# Bad: Unnamed vars (won't be preserved)
var tempVar = reactiveVar(0)

# Good: Explicit dependencies
var fullName = computed:
  firstName.value & " " & lastName.value

# Bad: Hidden side effects in click handlers
Button:
  onClick = proc() =
    # Updates multiple unrelated vars
    var1.value = 1
    var2.value = 2
    var3.value = 3
```

### Error Handling

```nim
# Validate IR before using
let (valid, errors) = validateIR("app.kir")
if not valid:
  for err in errors:
    echo "Validation error: ", err
  quit(1)

# Handle deserialization failures
let root = ir_read_binary_file("app.kir")
if root == nil:
  echo "Failed to load IR file"
  quit(1)
```

### Debugging

```bash
# Enable layout tracing
KRYON_TRACE_LAYOUT=1 kryon run app.nim

# Enable component tracing
KRYON_TRACE_COMPONENTS=1 kryon run app.nim

# Inspect IR tree
kryon tree app.kir --max-depth=10

# Compare before/after
kryon diff before.kir after.kir
```

## Advanced Topics

### Custom Serialization

Extend IR serialization for custom component types:

```c
// Register custom serializer
void serialize_my_component(IRBuffer* buffer, IRComponent* comp) {
    // Write custom data
    ir_buffer_write(buffer, &comp->custom_data, sizeof(MyCustomData));
}

ir_register_serializer(IR_COMPONENT_CUSTOM, serialize_my_component);
```

### Performance Profiling

```bash
# Profile compilation
time kryon compile --no-cache app.nim

# Profile serialization
KRYON_PROFILE=1 kryon run app.nim

# Analyze cache efficiency
kryon compile app.nim --verbose
```

### CI/CD Integration

```yaml
# .github/workflows/build.yml
name: Build and Validate

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: |
          sudo apt-get install -y nim libsdl3-dev

      - name: Build IR library
        run: make -C ir all

      - name: Build CLI
        run: nimble build

      - name: Compile app to IR
        run: ./bin/cli/kryon compile src/main.nim --validate

      - name: Run tests
        run: make -C ir/tests test_all
```

## Resources

- **Format Specification**: [KIR_FORMAT_V2.md](./KIR_FORMAT_V2.md)
- **API Reference**: `ir/*.h` header files
- **Examples**: `examples/nim/`, `examples/lua/`
- **CLI Source**: `cli/*.nim`

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on:
- Code style
- Testing requirements
- PR process
- Documentation standards

## Support

- **Issues**: https://github.com/yourorg/kryon/issues
- **Discussions**: https://github.com/yourorg/kryon/discussions
- **Discord**: https://discord.gg/kryon
