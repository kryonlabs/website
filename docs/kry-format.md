# .kry Format Guide

The `.kry` format is Kryon's native declarative UI language - a simple, JSON-like syntax for defining user interfaces without requiring a full programming language.

## When to Use .kry

**Use .kry when:**
- Building simple static UIs
- Prototyping layouts quickly
- Learning Kryon basics
- No complex logic or state needed

**Use language bindings (Nim, TypeScript, etc.) when:**
- Need reactive state management
- Require event handlers and logic
- Building full applications
- Want type safety and IDE support

## Basic Syntax

```kry
App {
    windowTitle = "My App"
    windowWidth = 800
    windowHeight = 600

    Container {
        width = 200
        height = 100
        backgroundColor = "#191970"

        Text {
            text = "Hello World"
            color = "white"
        }
    }
}
```

## File Structure

Every `.kry` file has:
1. Root `App` component with window configuration
2. Nested component tree
3. Properties assigned with `=`
4. Comments with `//` or `/* */`

## Component Types

### Layout Components

**Container** - Generic container with styling:
```kry
Container {
    width = 400
    height = 300
    backgroundColor = "#2C3E50"
    padding = 20
    borderRadius = 10
}
```

**Column** - Vertical layout:
```kry
Column {
    gap = 15
    padding = 20

    Text { text = "Item 1" }
    Text { text = "Item 2" }
    Text { text = "Item 3" }
}
```

**Row** - Horizontal layout:
```kry
Row {
    gap = 10
    justifyContent = "space-between"

    Button { text = "Left" }
    Button { text = "Right" }
}
```

**Center** - Centered layout:
```kry
Center {
    Text {
        text = "Centered"
        fontSize = 24
    }
}
```

### Content Components

**Text** - Display text:
```kry
Text {
    text = "Hello Kryon"
    fontSize = 18
    color = "#ECF0F1"
    fontWeight = "bold"
}
```

**Button** - Clickable button:
```kry
Button {
    text = "Click Me"
    width = 120
    height = 40
    backgroundColor = "#3498DB"
    color = "#FFFFFF"
}
```

**Input** - Text input field:
```kry
Input {
    placeholder = "Enter text..."
    width = 300
    height = 40
}
```

**Image** - Display images:
```kry
Image {
    src = "assets/logo.png"
    width = 200
    height = 200
    borderRadius = 100
}
```

**Checkbox** - Toggle checkbox:
```kry
Checkbox {
    label = "Accept terms"
    checked = false
}
```

### Special Components

**TabGroup** - Tab navigation:
```kry
TabGroup {
    TabBar {
        Tab { text = "Home" }
        Tab { text = "Settings" }
    }

    TabContent { index = 0
        Text { text = "Home content" }
    }

    TabContent { index = 1
        Text { text = "Settings content" }
    }
}
```

**Link** - Navigation link:
```kry
Link {
    text = "Documentation"
    href = "/docs"
    color = "#3498DB"
}
```

## Common Properties

### Layout Properties

```kry
Container {
    width = 400              // Fixed width in pixels
    height = 300             // Fixed height in pixels
    padding = 20             // All sides
    paddingTop = 10
    paddingBottom = 10
    paddingLeft = 15
    paddingRight = 15
    margin = 10              // External spacing
}
```

### Flexbox Properties

```kry
Column {
    gap = 15                 // Space between children
    justifyContent = "start" // start, center, end, space-between
    alignItems = "center"    // start, center, end, stretch
}
```

### Styling Properties

```kry
Container {
    backgroundColor = "#2C3E50"
    borderColor = "#3498DB"
    borderWidth = 2
    borderRadius = 10
    opacity = 0.9
}
```

### Text Properties

```kry
Text {
    fontSize = 18
    fontWeight = "bold"      // normal, bold
    color = "#FFFFFF"
    textAlign = "center"     // left, center, right
}
```

## Complete Example

```kry
App {
    windowTitle = "User Profile"
    windowWidth = 600
    windowHeight = 800

    Column {
        padding = 40
        gap = 30
        backgroundColor = "#ECF0F1"

        // Header
        Center {
            Image {
                src = "assets/avatar.png"
                width = 120
                height = 120
                borderRadius = 60
            }
        }

        // Name
        Center {
            Text {
                text = "John Doe"
                fontSize = 28
                fontWeight = "bold"
                color = "#2C3E50"
            }
        }

        // Bio
        Container {
            padding = 20
            backgroundColor = "#FFFFFF"
            borderRadius = 10

            Text {
                text = "Software developer passionate about UI frameworks"
                fontSize = 14
                color = "#7F8C8D"
            }
        }

        // Stats
        Row {
            gap = 20
            justifyContent = "space-around"

            Container {
                padding = 15
                backgroundColor = "#3498DB"
                borderRadius = 8

                Column {
                    gap = 5

                    Text {
                        text = "256"
                        fontSize = 24
                        fontWeight = "bold"
                        color = "#FFFFFF"
                    }

                    Text {
                        text = "Projects"
                        fontSize = 12
                        color = "#ECF0F1"
                    }
                }
            }

            Container {
                padding = 15
                backgroundColor = "#2ECC71"
                borderRadius = 8

                Column {
                    gap = 5

                    Text {
                        text = "1.2k"
                        fontSize = 24
                        fontWeight = "bold"
                        color = "#FFFFFF"
                    }

                    Text {
                        text = "Followers"
                        fontSize = 12
                        color = "#ECF0F1"
                    }
                }
            }
        }

        // Actions
        Column {
            gap = 10

            Button {
                text = "Edit Profile"
                width = 520
                height = 45
                backgroundColor = "#3498DB"
                color = "#FFFFFF"
                borderRadius = 8
            }

            Button {
                text = "View Projects"
                width = 520
                height = 45
                backgroundColor = "#2ECC71"
                color = "#FFFFFF"
                borderRadius = 8
            }
        }
    }
}
```

## CLI Usage

```bash
# Run .kry file
kryon run profile.kry

# Parse to KIR (intermediate representation)
kryon parse profile.kry
# -> Creates profile.kir

# Display component tree
kryon tree profile.kry
```

## Limitations

**.kry format does NOT support:**
- Event handlers (onClick, onChange, etc.)
- State management
- Conditional rendering
- Dynamic data binding
- Custom logic

For these features, use language bindings (Nim, TypeScript, etc.).

## Migration to Language Bindings

When you need more power, convert your `.kry` UI to a language binding:

**From .kry:**
```kry
Button {
    text = "Click Me"
    backgroundColor = "#3498DB"
}
```

**To Nim:**
```nim
import kryon_dsl

Button:
  text = "Click Me"
  backgroundColor = "#3498DB"
  onClick = proc() = echo "Clicked!"
```

**To TypeScript:**
```tsx
<button
  title="Click Me"
  backgroundColor="#3498DB"
  onClick={() => console.log("Clicked!")}
/>
```

## Best Practices

1. **Keep it simple** - Use .kry for static layouts only
2. **Consistent formatting** - Indent with 4 spaces
3. **Group related components** - Use comments to organize sections
4. **Meaningful names** - Clear property values (e.g., `windowTitle = "User Dashboard"`)
5. **Asset paths** - Use relative paths for images and resources

## Next Steps

- See [Components](./components.md) for full component reference
- See [Nim Bindings](./nim-frontend.md) for reactive UIs
- See [TypeScript Bindings](./typescript.md) for JSX syntax
