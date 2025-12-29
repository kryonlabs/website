# Kryon C Frontend Documentation

## Overview

The Kryon C frontend allows you to build cross-platform UIs using a simple C API. C code is compiled to Kryon IR (.kir files), which can then be rendered on any supported backend (SDL3, Terminal, Web).

### Architecture

```
.kry files -> .kir (JSON IR) -> codegen -> C source -> compile -> executable -> .kir output
                                                        |
                                                   SDL3/Terminal/Web renderer
```

All frontends follow the same universal IR pipeline, ensuring consistent behavior across languages.

## Getting Started

### Installation

1. Build the Kryon IR library and C bindings:
```bash
make build
cd bindings/c && make
```

2. Install the Kryon CLI:
```bash
make install
```

### Quick Start Example

**hello.c**:
```c
#include <kryon.h>

int main(void) {
    // Initialize with window configuration
    kryon_init("Hello Kryon", 800, 600);

    // Get the root container
    IRComponent* root = kryon_get_root();
    kryon_set_background(root, KRYON_COLOR_RGB(25, 25, 25));
    kryon_set_justify_content(root, IR_ALIGNMENT_CENTER);
    kryon_set_align_items(root, IR_ALIGNMENT_CENTER);

    // Create a text component
    IRComponent* text = kryon_text("Hello from Kryon C!");
    kryon_set_font_size(text, 32);
    kryon_set_color(text, KRYON_COLOR_WHITE);

    // Add to tree
    kryon_add_child(root, text);

    // Serialize to IR file
    kryon_finalize("hello.kir");
    kryon_cleanup();

    return 0;
}
```

**Compile and run**:
```bash
# Compile C source to .kir
kryon compile hello.c

# View the IR tree
kryon tree build/ir/hello.kir

# Render with SDL3 backend
kryon run build/ir/hello.kir
```

Alternatively, compile manually:
```bash
gcc hello.c \
  -I/path/to/kryon/bindings/c \
  -I/path/to/kryon/ir \
  -L/path/to/kryon/bindings/c \
  -L/path/to/kryon/build \
  -lkryon_c -lkryon_ir -lm \
  -o hello

# Run to generate .kir
./hello  # Creates hello.kir
```

## API Reference

### Initialization

```c
void kryon_init(const char* title, int width, int height);
```
Initialize Kryon with window configuration. Creates a root Container component.

```c
IRComponent* kryon_get_root(void);
```
Get the root container created by `kryon_init()`.

```c
bool kryon_finalize(const char* output_path);
```
Serialize the component tree to a .kir file. Returns true on success.
Supports `KRYON_SERIALIZE_IR` environment variable to override output path.

```c
void kryon_cleanup(void);
```
Clean up resources and handler registry.

### Component Creation

```c
IRComponent* kryon_container(void);
IRComponent* kryon_row(void);
IRComponent* kryon_column(void);
IRComponent* kryon_center(void);
IRComponent* kryon_text(const char* content);
IRComponent* kryon_button(const char* label);
IRComponent* kryon_input(const char* placeholder);
IRComponent* kryon_checkbox(const char* label, bool checked);
IRComponent* kryon_tab_group(void);
IRComponent* kryon_tab_bar(void);
IRComponent* kryon_tab(const char* title);
IRComponent* kryon_tab_content(void);
IRComponent* kryon_tab_panel(void);
```

### Layout Properties

```c
void kryon_set_width(IRComponent* c, float value, const char* unit);
void kryon_set_height(IRComponent* c, float value, const char* unit);
```
Units: `"px"`, `"%"`, `"auto"`, `"fr"`

```c
void kryon_set_justify_content(IRComponent* c, IRAlignment align);
void kryon_set_align_items(IRComponent* c, IRAlignment align);
```
Alignment values: `IR_ALIGNMENT_START`, `IR_ALIGNMENT_CENTER`, `IR_ALIGNMENT_END`,
`IR_ALIGNMENT_STRETCH`, `IR_ALIGNMENT_SPACE_BETWEEN`, `IR_ALIGNMENT_SPACE_AROUND`,
`IR_ALIGNMENT_SPACE_EVENLY`

```c
void kryon_set_padding(IRComponent* c, float value);
void kryon_set_margin(IRComponent* c, float value);
void kryon_set_gap(IRComponent* c, float value);
```

### Style Properties

```c
void kryon_set_background(IRComponent* c, uint32_t color);
void kryon_set_color(IRComponent* c, uint32_t color);
void kryon_set_opacity(IRComponent* c, float opacity);
void kryon_set_border_radius(IRComponent* c, float radius);
void kryon_set_font_size(IRComponent* c, float size);
```

### Color Utilities

```c
#define KRYON_COLOR_RGB(r, g, b)  (((uint32_t)(r) << 16) | ((uint32_t)(g) << 8) | (uint32_t)(b))
#define KRYON_COLOR_BLACK   0x000000
#define KRYON_COLOR_WHITE   0xFFFFFF
#define KRYON_COLOR_RED     0xFF0000
#define KRYON_COLOR_GREEN   0x00FF00
#define KRYON_COLOR_BLUE    0x0000FF
#define KRYON_COLOR_YELLOW  0xFFFF00
```

### Tree Management

```c
void kryon_add_child(IRComponent* parent, IRComponent* child);
void kryon_remove_child(IRComponent* parent, IRComponent* child);
```

### Event Handlers

```c
typedef void (*KryonEventHandler)(void);

void kryon_on_click(IRComponent* button, KryonEventHandler handler);
void kryon_on_change(IRComponent* input, KryonEventHandler handler);
```

**Example**:
```c
void on_button_click(void) {
    printf("Button clicked!\n");
}

IRComponent* btn = kryon_button("Click Me");
kryon_on_click(btn, on_button_click);
```

## Code Generation from .kry

The recommended workflow is to write UI in `.kry` format and auto-generate C code:

```bash
# 1. Write UI in .kry format
cat > app.kry <<'EOF'
App {
  title: "My App"
  width: 800
  height: 600

  Column {
    background: #1a1a1a
    padding: 20
    gap: 10

    Text {
      content: "Welcome"
      fontSize: 24
      color: white
    }

    Button {
      text: "Click Me"
      background: #4a4aff
    }
  }
}
EOF

# 2. Compile to .kir (with --preserve-static for codegen)
kryon compile app.kry --preserve-static --output=app.kir

# 3. Generate C code
kryon codegen app.kir --lang=c --output=app.c

# 4. Compile and run
gcc app.c -I... -L... -lkryon_c -lkryon_ir -lm -o app
./app  # Generates output.kir
```

The generated C code is clean, idiomatic, and includes:
- Component creation
- Property setting
- Tree construction
- Root handling (adds to C API root)

**Auto-generation script** (for all examples):
```bash
./scripts/generate_examples.sh --lang=c
```

## Complete Example: Interactive Counter

```c
#include <kryon.h>
#include <stdio.h>

static int counter = 0;

void on_increment(void) {
    counter++;
    printf("Counter: %d\n", counter);
}

void on_decrement(void) {
    counter--;
    printf("Counter: %d\n", counter);
}

int main(void) {
    kryon_init("Counter Demo", 400, 300);

    IRComponent* root = kryon_get_root();
    kryon_set_background(root, KRYON_COLOR_RGB(30, 30, 30));
    kryon_set_padding(root, 40);
    kryon_set_gap(root, 20);
    kryon_set_align_items(root, IR_ALIGNMENT_CENTER);

    // Title
    IRComponent* title = kryon_text("Counter");
    kryon_set_font_size(title, 28);
    kryon_set_color(title, KRYON_COLOR_WHITE);

    // Button row
    IRComponent* row = kryon_row();
    kryon_set_gap(row, 10);

    IRComponent* dec_btn = kryon_button("-");
    kryon_set_background(dec_btn, KRYON_COLOR_RGB(200, 50, 50));
    kryon_set_padding(dec_btn, 15);
    kryon_on_click(dec_btn, on_decrement);

    IRComponent* inc_btn = kryon_button("+");
    kryon_set_background(inc_btn, KRYON_COLOR_RGB(50, 200, 50));
    kryon_set_padding(inc_btn, 15);
    kryon_on_click(inc_btn, on_increment);

    // Build tree
    kryon_add_child(row, dec_btn);
    kryon_add_child(row, inc_btn);

    kryon_add_child(root, title);
    kryon_add_child(root, row);

    kryon_finalize("counter.kir");
    kryon_cleanup();

    return 0;
}
```

## Workflow Comparison

### Manual C Development
```
Write C -> Compile -> Run -> Generate .kir -> Render
```
**Pros**: Direct control, familiar C tooling
**Cons**: Verbose, manual tree management

### Code Generation from .kry
```
Write .kry -> Compile to .kir -> Codegen C -> Compile -> Run -> .kir
```
**Pros**: Concise syntax, automatic validation, version control friendly
**Cons**: Extra step (transparent with scripts)

## Environment Variables

- `KRYON_SERIALIZE_IR=path.kir` - Override output path in `kryon_finalize()`
- `LD_LIBRARY_PATH=build:$LD_LIBRARY_PATH` - Required for finding shared libraries

## Integration with Kryon CLI

The C frontend integrates seamlessly with the Kryon CLI:

```bash
# Compile C to IR
kryon compile app.c --output=app.kir

# With caching (fast rebuilds)
kryon compile app.c  # Uses cache if source unchanged

# Disable cache
kryon compile app.c --no-cache

# Validate IR
kryon compile app.c --validate

# Convert to binary format
kryon convert app.kir app.kirb

# Inspect
kryon tree app.kir
kryon inspect-detailed app.kir
```

## Limitations and Notes

1. **Root Container Wrapper**: The C bindings create a root Container in `kryon_init()`. When generating C from .kir files, the .kir root becomes a child of this Container, creating one extra nesting level in round-trip scenarios.

2. **Reactive State**: The C frontend does not currently support reactive state management. For reactive UIs, use the Nim or Lua frontends.

3. **Animations**: Basic animation support via IR, but the C API doesn't provide high-level animation helpers yet.

4. **Event Handlers**: Event handlers are function pointers that execute when the C program runs. They won't persist in the serialized .kir file (only the event metadata is stored).

5. **Hot Reload**: Not supported in C frontend (compile-time only).

## Advanced: Linking and Deployment

### Static Linking
```bash
gcc app.c \
  -I/path/to/kryon/bindings/c \
  -I/path/to/kryon/ir \
  /path/to/bindings/c/libkryon_c.a \
  /path/to/build/libkryon_ir.a \
  -lm -o app
```

### Shared Library Linking
```bash
gcc app.c \
  -I... -L... \
  -lkryon_c -lkryon_ir \
  -Wl,-rpath,/path/to/libs \
  -lm -o app
```

### Installation
After `make install`, libraries and headers are in:
- `~/.local/lib/libkryon_c.a`
- `~/.local/include/kryon/c/`

## See Also

- [KIR Format Specification](KIR_FORMAT_V2.md)
- [Developer Guide](DEVELOPER_GUIDE.md)
- [Nim Frontend Documentation](../CLAUDE.md#nim-bindings)
- [Example Gallery](../examples/kry/)

## Support

For issues or questions:
- GitHub Issues: https://github.com/anthropics/kryon/issues
- Check `examples/c/` for auto-generated examples
