# Kryon Architecture

## Overview

Kryon is a multi-platform UI framework designed with a clean separation between language bindings, the IR core, rendering backends, and transpilation targets.

### Core Philosophy
*   **Minimal surfaces, maximal flexibility.**
*   **Hardware-aware abstractions.**
*   **Declarative UI in your application language.**

### Architecture Layers

**Language Bindings** → **KIR Pipeline** → **Rendering Backends + Codegens**

- **Rendering Backends** (SDL3, Terminal): Use Kryon's renderer to draw UI directly
- **Codegens/Transpilers** (HTML/Web, TSX, JSX): Generate code that browsers/tools render

## File Formats

Kryon uses two runtime file formats:

- **.kir** - JSON intermediate representation (human-readable, for development and debugging)
- **.krb** - Standalone binary package (like .love files), portable across all renderers

**Native Targets** (Nim, C, Rust) compile directly to native code that generates IR at runtime.

**VM Targets** (Lua, JavaScript/TypeScript, Python, .kry) compile to `.krb` packages that run in any Kryon renderer.

## Pipeline Diagram

```mermaid
flowchart TB
    subgraph Frontends["FRONTENDS (Language Bindings)"]
        direction LR
        Nim["Nim<br/>(DSL Macros)"]
        TS["TypeScript<br/>(JSX/Bun)"]
        Lua["Lua<br/>(DSL Tables)"]
        C["C<br/>(Direct API)"]
    end

    subgraph Core["IR CORE (C Library)"]
        direction TB
        Builder["ir_builder<br/>* Components<br/>* Tree mgmt<br/>* Styles"]
        Layout["ir_layout<br/>* Flexbox<br/>* Size calc<br/>* Alignment"]
        Events["ir_events<br/>* Click/Hover<br/>* Focus/Blur<br/>* Keyboard"]
        IRComp["IRComponent<br/>(Tree Structure)"]

        Builder --> IRComp
        Layout --> IRComp
        Events --> IRComp
    end

    subgraph Backends["RENDERING BACKENDS (Use Kryon's Renderer)"]
        direction LR
        SDL3["SDL3<br/>* GPU accel<br/>* TTF fonts<br/>* Desktop"]
        Terminal["Terminal<br/>* libtickit<br/>* Unicode<br/>* SSH-able"]
        Framebuffer["Framebuffer<br/>* /dev/fb0<br/>* Embedded<br/>* No X11"]
    end

    subgraph Codegens["CODEGENS (Generate Browser/Source Code)"]
        direction LR
        HTML["HTML/Web<br/>* HTML gen<br/>* CSS flexbox<br/>* Browser"]
        TSX["TSX<br/>* TypeScript<br/>* React compat"]
        JSX["JSX<br/>* JavaScript<br/>* React compat"]
    end

    Nim --> Core
    TS --> Core
    Lua --> Core
    C --> Core

    Core --> SDL3
    Core --> Terminal
    Core --> Framebuffer
    Core --> HTML
    Core --> TSX
    Core --> JSX

    SDL3 --> Desktop["Desktop Window<br/>(Linux/macOS/Windows)"]
    Terminal --> Term["Terminal Emulator<br/>(xterm/konsole/SSH)"]
    Framebuffer --> Embedded["Embedded Display<br/>(RPi/MCU)"]
    HTML --> Browser["Web Browser<br/>(Chrome/Firefox/Safari)"]
    TSX --> ReactTS["React/TypeScript Apps"]
    JSX --> ReactJS["React/JavaScript Apps"]
```

## Data Flow

```mermaid
flowchart TB
    subgraph Define["1. DEFINE UI"]
        NimDSL["Nim DSL<br/>Container:<br/>  Button: text='Click'"]
        TSXDSL["TypeScript JSX<br/>&lt;column&gt;<br/>  &lt;button title='Click' /&gt;<br/>&lt;/column&gt;"]
    end

    subgraph IRTree["2. CREATE IR TREE"]
        Tree["IRComponent (Column)<br/>+- style: width=100%<br/>+- layout: gap=10<br/>+- children:<br/>    +- IRComponent (Button)<br/>        +- events: onClick"]
    end

    subgraph Layout["3. COMPUTE LAYOUT"]
        Calc["ir_layout.c<br/>* Resolve dimensions<br/>* Position offsets<br/>* Flex distribution<br/>* Alignment"]
    end

    subgraph RenderBackends["4A. RENDERING BACKENDS"]
        direction LR
        R1["SDL3<br/>Draw rects<br/>TTF text"]
        R2["Terminal<br/>Box chars<br/>ANSI color"]
        R3["Framebuffer<br/>Direct pixels"]
    end

    subgraph Codegens2["4B. CODEGENS (Transpilers)"]
        direction LR
        C1["HTML/Web<br/>Generate HTML<br/>CSS flexbox"]
        C2["TSX/JSX<br/>Generate React<br/>Components"]
    end

    NimDSL --> Tree
    TSXDSL --> Tree
    Tree --> Calc
    Calc --> R1
    Calc --> R2
    Calc --> R3
    Calc --> C1
    Calc --> C2
```

## System Architecture

### Layered Onion Model

```mermaid
flowchart TB
    L1["<b>APPLICATION LAYER</b><br/>Your Business Logic<br/>(Nim/Rust/C/JS/Lua)"]
    L2["<b>INTERFACE LAYER</b><br/>Language Bindings & Macros<br/>(Nim DSL, JSX Runtime)"]
    L3["<b>CORE LAYER</b><br/>Component Model, State, Layout<br/>(C ABI)"]
    L4["<b>OUTPUT LAYER</b><br/>Renderers & Transpilers<br/>(C ABI)"]
    L5A["<b>RENDERING BACKENDS</b><br/>SDL3 | Terminal | Framebuffer"]
    L5B["<b>CODEGENS</b><br/>HTML/Web | TSX | JSX"]

    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> L5A
    L4 --> L5B
```

### Critical Boundary

The **Core Layer** and **Renderer Abstraction** expose a pure C ABI. This allows:
*   Microcontrollers to link directly to the C core.
*   Desktop apps to use high-level bindings.
*   Web apps to compile to WASM.

## Component Types

```mermaid
flowchart TB
    subgraph Layout["LAYOUT COMPONENTS"]
        Container["Container (div)"]
        Container --> Row["Row (<->)"]
        Container --> Column["Column (^v)"]
        Container --> Center["Center (+)"]
    end

    subgraph Content["CONTENT COMPONENTS"]
        Text["Text"]
        Button["Button"]
        Input["Input"]
        Checkbox["Checkbox"]
        Dropdown["Dropdown"]
        Image["Image"]
    end

    subgraph Special["SPECIAL COMPONENTS"]
        TabGroup["TabGroup"]
        Canvas["Canvas"]
        Markdown["Markdown"]
    end
```

## Directory Structure

```
kryon/
+-- ir/                          # IR Core (C)
|   +-- ir_core.h               # Component types, structs
|   +-- ir_builder.c            # Tree construction
|   +-- ir_layout.c             # Flexbox layout
|   +-- ir_events.c             # Event handling
|
+-- backends/
|   +-- desktop/                # Desktop rendering backend
|       +-- sdl_backend.c       # SDL3 rendering
|       +-- ir_desktop_renderer.c
|
+-- codegens/
|   +-- web/                    # HTML/Web transpiler
|       +-- html_generator.c    # HTML output
|       +-- css_generator.c     # CSS output
|       +-- ir_web_renderer.c
|
+-- bindings/
|   +-- nim/                    # Nim frontend
|   |   +-- kryon_dsl.nim       # DSL macros
|   |   +-- runtime.nim         # Event handlers
|   |   +-- reactive_system.nim # State management
|   +-- typescript/             # TypeScript frontend
|       +-- src/
|           +-- jsx-runtime.ts  # JSX transform
|           +-- renderer.ts     # IRNode -> C IR
|           +-- ffi.ts          # Bun FFI bindings
|           +-- app.ts          # Entry point
|
+-- examples/
|   +-- nim/                    # Nim examples
|   |   +-- hello_world.nim
|   |   +-- button_demo.nim
|   |   +-- ...
|   +-- typescript/             # TypeScript examples
|       +-- hello_world.tsx
|       +-- button_demo.tsx
|       +-- ...
|
+-- build/                      # Compiled libraries
    +-- libkryon_ir.a           # Core IR library
    +-- libkryon_desktop.so     # SDL3 rendering backend
    +-- libkryon_web.so         # HTML/Web codegen
```

## Running Examples

```bash
# Nim + SDL3 (default)
./run_example.sh hello_world
./run_example.sh hello_world nim sdl3

# Nim + Terminal
./run_example.sh hello_world nim terminal

# TypeScript + SDL3
./run_example.sh hello_world ts
./run_example.sh hello_world typescript sdl3

# TypeScript + HTML/Web codegen (transpiles to HTML, starts server)
./run_example.sh hello_world ts web

# By number (from example list)
./run_example.sh 22   # hello_world typescript
```

## Core Layer (C99 ABI)

The core layer handles:
*   Component tree lifecycle.
*   Unified event system.
*   Flexbox-inspired layout engine.
*   Style resolution.
*   Storage API.

It guarantees:
*   **No global state.**
*   **Deterministic layout.**
*   **No hidden allocations.**
*   **Fixed-point math** for MCU compatibility.

## Renderer Abstraction

All backends must implement a minimal set of primitive commands:
*   `draw_rect`
*   `draw_text`
*   `draw_line`
*   `swap_buffers`

## Language Binding Compatibility

### Rendering Backends

| Binding    | SDL3 | Terminal | Framebuffer |
|------------|:----:|:--------:|:-----------:|
| Nim        | [x]  |   [x]    |     [x]     |
| TypeScript | [x]  |   [x]    |     [~]     |
| Lua        |  -   |    -     |      -      |
| C          | [x]  |   [x]    |     [x]     |

### Codegens (Transpilers)

| Binding    | HTML/Web | TSX | JSX |
|------------|:--------:|:---:|:---:|
| Nim        |   [x]    | [-] | [-] |
| TypeScript |   [x]    | [-] | [-] |
| Lua        |    -     |  -  |  -  |
| C          |   [x]    | [-] | [-] |

**Legend:** [x] = Supported, [~] = Partial, - = Planned, [-] = Not applicable

## Rendering Backends

| Backend     | Use Case                | Platform              | Key Features                        |
|-------------|-------------------------|-----------------------|-------------------------------------|
| SDL3        | Desktop apps, Games     | Linux/macOS/Windows   | GPU accel, TTF fonts, Mouse/KB      |
| Terminal    | CLI tools, Remote/SSH   | Any terminal          | TUI boxes, Unicode, ANSI color      |
| Framebuffer | Embedded, Kiosk         | Linux /dev/fb0, RPi   | Direct pixels, No X11, Minimal deps |

## Codegens (Transpilers)

| Codegen     | Output Format           | Use Case              | Key Features                        |
|-------------|-------------------------|-----------------------|-------------------------------------|
| HTML/Web    | HTML/CSS/JS files       | Browser apps, Sites   | CSS flexbox, DOM events, Static gen |
| TSX         | TypeScript/React code   | React apps            | Component transpilation, Type-safe  |
| JSX         | JavaScript/React code   | React apps            | Component transpilation             |

## Frontend Overview

| Frontend   | Syntax                | Runtime         | Best For                      |
|------------|----------------------|-----------------|-------------------------------|
| Nim        | DSL macros           | Compiled native | Performance, Desktop, Embedded|
| TypeScript | JSX syntax           | Bun + FFI       | Web devs, Rapid prototyping   |
| Lua        | Table-based (planned)| Lua VM          | Scripting, Hot-reload, Modding|
| C          | Direct API calls     | Compiled native | Max control, Library integration |

## Quick Reference

```bash
# List all examples
./run_example.sh

# Language binding options: nim, ts (typescript), lua, c
# Rendering backend options: sdl3, terminal, framebuffer
# Codegen options: web (HTML/CSS/JS transpiler)

# Examples:
./run_example.sh hello_world              # nim + sdl3 (default)
./run_example.sh hello_world nim sdl3     # nim + sdl3 (explicit)
./run_example.sh hello_world nim terminal # nim + terminal rendering
./run_example.sh hello_world ts           # typescript + sdl3
./run_example.sh hello_world ts web       # typescript + HTML codegen (transpiles to browser)
./run_example.sh hello_world ts terminal  # typescript + terminal rendering
```
