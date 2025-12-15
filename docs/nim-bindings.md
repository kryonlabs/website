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

  Body:
    backgroundColor = "#191970"

    Container:
      width = 100.percent
      justifyContent = "center"
      alignItems = "center"

      Text:
        text = "Hello from Nim!"
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

# Define an event handler
proc handleButtonClick*() =
  echo "Button clicked!"

let app = kryonApp:
  Header:
    windowWidth = 800
    windowHeight = 600
    windowTitle = "My App"

  Body:
    backgroundColor = "#1E1E1E"

    Column:
      width = 100.percent
      gap = 16
      padding = 20

      Text:
        text = "Welcome!"
        fontSize = 24
        color = "#FFFFFF"

      Button:
        text = "Click me"
        background = "#4a90e2"
        color = "#FFFFFF"
        onClick = handleButtonClick
```

### Reactive State

The Nim bindings include a reactive system for dynamic UIs. Use `namedReactiveVar` to create reactive variables that automatically update bound UI components:

```nim
import kryon_dsl

# Create reactive state
var counter = namedReactiveVar("counter", 0)

# Event handlers
proc increment*() =
  counter.value += 1

proc decrement*() =
  counter.value -= 1

let app = kryonApp:
  Header:
    windowWidth = 800
    windowHeight = 600
    windowTitle = "Counter"

  Body:
    backgroundColor = "#1E1E1E"

    Column:
      width = 100.percent
      height = 100.percent
      justifyContent = "center"
      alignItems = "center"
      gap = 20

      Text:
        text = "Counter Demo"
        fontSize = 24
        color = "#FFFFFF"

      Row:
        alignItems = "center"
        gap = 32

        Button:
          text = "-"
          fontSize = 24
          width = 60
          height = 50
          backgroundColor = "#E74C3C"
          onClick = decrement

        Text:
          text = $counter.value
          fontSize = 32
          color = "#FFFFFF"

        Button:
          text = "+"
          fontSize = 24
          width = 60
          height = 50
          backgroundColor = "#2ECC71"
          onClick = increment
```

Key points:
- `namedReactiveVar("name", value)` creates a reactive variable
- Access the value with `.value` (e.g., `counter.value`)
- UI automatically updates when the value changes

### Layout Components

```nim
# Row layout (horizontal)
Row:
  gap = 16
  alignItems = "center"
  justifyContent = "space-between"

  Text:
    text = "Left"
    color = "#FFFFFF"
  Text:
    text = "Right"
    color = "#FFFFFF"

# Column layout (vertical)
Column:
  gap = 8

  Text:
    text = "Top"
    color = "#FFFFFF"
  Text:
    text = "Bottom"
    color = "#FFFFFF"

# Centered content
Center:
  Text:
    text = "I'm centered!"
    color = "#FFFFFF"
```

### Styling

```nim
Container:
  width = 200
  height = 100
  backgroundColor = "#2c2c2c"
  borderRadius = 8
  padding = 16
  borderWidth = 1
  borderColor = "#444444"

  Text:
    text = "Styled container"
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
