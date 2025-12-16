# Rust Frontend

Kryon's Rust bindings provide a type-safe, declarative UI framework with reactive state management and a powerful macro system.

## Features

- **Type-Safe IR Construction** - Full Rust compile-time validation
- **Reactive State** - `Signal<T>` for automatic UI updates
- **Declarative Macros** - `kryon_app!` macro with clean syntax
- **Builder API** - Manual component construction when needed
- **Full Serialization** - Perfect round-trip to `.kir` format

## Quick Start

### Installation

Add to your `Cargo.toml`:

```toml
[dependencies]
kryon = "0.1"
kryon-macros = "0.1"
```

### Basic Example

```rust
use kryon::prelude::*;
use kryon_macros::kryon_app;

fn main() {
    let app = kryon_app! {
        Column {
            width: 800,
            height: 600,
            background: "#2c2c2c",

            Text {
                content: "Hello from Rust!",
                color: "#ffffff",
                fontSize: 24,
            }
        }
    };

    app.save_to_file("app.kir").unwrap();
}
```

## Reactive State

### Creating Signals

```rust
use kryon::reactive::signal;

let count = signal(0);
```

### Reading and Updating

```rust
// Read value
let current = count.get();

// Set value
count.set(10);

// Update with closure
count.update(|c| *c += 1);
```

### Reactive UI

```rust
kryon_app! {
    Column {
        Text {
            content: format!("Count: {}", count.get()),
        }

        Button {
            text: "+",
            // onClick: || count.update(|c| *c += 1),  // Future
        }
    }
}
```

## Component Types

### Layout Components

```rust
// Container - generic layout container
Container {
    width: 100.percent,
    height: auto,
}

// Row - horizontal layout
Row {
    gap: 16,
    alignItems: "center",
}

// Column - vertical layout
Column {
    gap: 8,
    justifyContent: "space-between",
}
```

### Content Components

```rust
// Text
Text {
    content: "Hello",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
}

// Button
Button {
    text: "Click me",
    background: "#3d3d3d",
    // onClick: || { /* handler */ },  // Future
}
```

## Dimensions

```rust
// Pixels
width: 800

// Percentage
width: 100.percent
width: 50.percent

// Auto (calculated)
width: auto

// Fractional (flex units)
width: 1.fr
```

## Colors

```rust
// Hex colors
background: "#2c2c2c"
color: "#ffffff"

// Named colors (future)
background: "red"
```

## Builder API

For dynamic UIs, use the builder API directly:

```rust
use kryon::builder::*;

let root = column()
    .width(800)
    .height(600)
    .background("#2c2c2c")
    .gap(16)
    .child(
        text("Hello from Rust!")
            .color("#ffffff")
            .font_size(24)
    )
    .build("root");
```

## Serialization

Save to `.kir` format:

```rust
use kryon::ir::IRDocument;

let doc = IRDocument {
    version: "3.0".to_string(),
    root,
};

// Save to file
doc.save_to_file("app.kir")?;

// Serialize to JSON
let json = serde_json::to_string_pretty(&doc)?;
```

## Running Rust Apps

```bash
# Compile to .kir
cargo build
./target/debug/your_app  # Generates app.kir

# Run with Kryon CLI (future)
kryon run src/main.rs --backend=sdl3
```

## Examples

### Counter App

```rust
use kryon::prelude::*;
use kryon_macros::kryon_app;

fn main() {
    let count = signal(0);

    let app = kryon_app! {
        Column {
            width: 400,
            height: 300,
            background: "#2c2c2c",
            gap: 16,
            padding: 20,

            Text {
                content: format!("Count: {}", count.get()),
                color: "#ffffff",
                fontSize: 32,
            }

            Row {
                gap: 8,

                Button {
                    text: "-",
                    width: 60,
                }

                Button {
                    text: "+",
                    width: 60,
                }
            }
        }
    };

    app.save_to_file("counter.kir").unwrap();
}
```

### Form Example

```rust
kryon_app! {
    Column {
        width: 500,
        height: 400,
        background: "#1a1a1a",
        padding: 32,
        gap: 16,

        Text {
            content: "User Registration",
            fontSize: 24,
            fontWeight: "bold",
            color: "#ffffff",
        }

        // Username input (future)
        // Email input (future)

        Row {
            gap: 12,
            justifyContent: "flex-end",

            Button {
                text: "Cancel",
                background: "#3d3d3d",
            }

            Button {
                text: "Submit",
                background: "#58a6ff",
            }
        }
    }
}
```

## Advanced Features

### Conditional Rendering

```rust
let show_panel = signal(true);

kryon_app! {
    Column {
        if show_panel.get() {
            Text { content: "Panel visible" }
        }
    }
}
```

### Lists and Loops

```rust
let items = vec!["Apple", "Banana", "Orange"];

kryon_app! {
    Column {
        for item in items {
            Text { content: item }
        }
    }
}
```

## Comparison with Nim

| Feature | Rust | Nim |
|---------|------|-----|
| Syntax | `kryon_app! { }` | `Container: ...` |
| Reactive | `Signal<T>` | `ReactiveState[T]` |
| Type Safety | Compile-time | Compile-time |
| Performance | Native binary | Native binary |
| Ecosystem | Cargo/crates.io | Nimble |

## Development Status

**Current (v0.1):**
- ✅ Core IR types and serialization
- ✅ Builder API
- ✅ Signal<T> reactive state
- ✅ kryon_app! macro with clean syntax
- ✅ Conditional rendering
- ✅ Loop support

**Future:**
- ⏳ Event handler binding (onClick, etc.)
- ⏳ Automatic reactive bindings
- ⏳ CLI integration (`kryon run app.rs`)
- ⏳ Advanced components (Tabs, Tables)
- ⏳ Animation support

## Contributing

The Rust frontend is under active development. Contributions welcome!

Repository: https://github.com/kryonlabs/kryon

## License

MIT License - see LICENSE file for details
