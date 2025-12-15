# Kryon Nim Bindings

The primary and most feature-complete bindings for Kryon. The Nim DSL provides a reactive, type-safe way to build UIs that compile directly to the C IR core.

## Overview

The Nim bindings offer a declarative DSL that transforms into direct C function calls at compile time. This gives you:

- **Type safety** - Compile-time checking of all properties
- **Reactive state** - Built-in reactive system for dynamic UIs
- **Zero runtime overhead** - DSL macros generate optimal C calls

```nim
import kryon_dsl

let app = kryonApp:
  Header:
    windowWidth = 800
    windowHeight = 600
    windowTitle = "Hello Kryon"

  Container:
    width = 100.percent
    height = auto
    backgroundColor = "#191970"

    Text:
      content = "Hello from Nim!"
      fontSize = 32
      color = "white"
```

## Installation

### Prerequisites

- **Nim 2.0+**
- Kryon C libraries (`libkryon_ir.so`, `libkryon_desktop.so`)

```bash
# Install Nim (if not already installed)
curl https://nim-lang.org/choosenim/init.sh -sSf | sh
```

### Setup

```bash
# Clone Kryon
git clone https://github.com/kryonlabs/kryon.git
cd kryon

# Build the C libraries
make build

# The Nim bindings are in bindings/nim/
```

## Usage

### Basic Example

```nim
import kryon_dsl

let app = kryonApp:
  Header:
    windowWidth = 800
    windowHeight = 600
    windowTitle = "My App"

  Column:
    width = 100.percent
    gap = 16

    Text:
      content = "Welcome!"
      fontSize = 24
      fontWeight = "bold"

    Button:
      title = "Click me"
      onClick = proc() =
        echo "Button clicked!"

app.run()
```

### Reactive State

The Nim bindings include a powerful reactive system:

```nim
import kryon_dsl

var counter = initReactiveState(0)

let app = kryonApp:
  Header:
    windowTitle = "Counter"

  Column:
    width = 100.percent
    alignItems = "center"
    gap = 16

    Text:
      content = fmt"Count: {counter.value}"

    Row:
      gap = 8

      Button:
        title = "-"
        onClick = proc() =
          counter.value -= 1

      Button:
        title = "+"
        onClick = proc() =
          counter.value += 1

app.run()
```

### Layout Components

```nim
# Row layout (horizontal)
Row:
  gap = 16
  alignItems = "center"
  justifyContent = "space-between"

  Text: content = "Left"
  Text: content = "Right"

# Column layout (vertical)
Column:
  gap = 8

  Text: content = "Top"
  Text: content = "Bottom"

# Centered content
Center:
  Text: content = "I'm centered!"
```

### Styling

```nim
Container:
  width = 200
  height = 100
  backgroundColor = "#2c2c2c"
  borderRadius = 8
  padding = 16
  border = "1px solid #444"

  Text:
    content = "Styled container"
    color = "#ffffff"
    fontSize = 14
```

## Components

| Component | Description |
|-----------|-------------|
| `Container` | Generic flex container |
| `Row` | Horizontal flex layout |
| `Column` | Vertical flex layout |
| `Center` | Centers children |
| `Text` | Text display |
| `Button` | Clickable button |
| `Input` | Text input field |
| `Checkbox` | Toggle checkbox |
| `Image` | Image display |
| `TabGroup` | Tabbed interface |

## Running Examples

```bash
# Run any example from the examples/kry directory
./run_example.sh button_demo
./run_example.sh counters_demo
./run_example.sh tabs_reorderable
```

## Resources

- [GitHub Repository](https://github.com/kryonlabs/kryon)
- [Examples](https://github.com/kryonlabs/kryon/tree/master/examples/kry)
- [Architecture Documentation](/docs/architecture)
