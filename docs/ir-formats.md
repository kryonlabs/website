# IR File Formats

Kryon uses intermediate representation (IR) files to store compiled UI definitions. There are two formats: `.kir` (JSON) and `.kirb` (binary).

## Format Comparison

| Format | Type | Size | Use Case |
|--------|------|------|----------|
| `.kir` | JSON text | Baseline | Development, debugging, human-readable |
| `.kirb` | Binary | 5-10× smaller | Production, embedded, distribution |

## .kir Format (JSON)

Human-readable JSON format for UI definitions.

### Features

- **Text-based** - Easy to read and edit
- **Version tracked** - Works well with git
- **Debuggable** - Can inspect with any text editor
- **Named colors** - Supports color names like "red", "blue"
- **Comments** - JSON5-style comments supported (in parser)

### Example

```json
{
  "version": "3.0",
  "root": {
    "type": "COLUMN",
    "id": "root",
    "properties": {
      "width": "800px",
      "height": "600px",
      "background": "#2c2c2c",
      "gap": "16px"
    },
    "children": [
      {
        "type": "TEXT",
        "id": "title",
        "properties": {
          "content": "Hello Kryon",
          "color": "#ffffff",
          "fontSize": "24px"
        }
      }
    ]
  }
}
```

### When to Use

- **Development** - When building and iterating on UIs
- **Debugging** - When you need to inspect component trees
- **Version Control** - When tracking UI changes in git
- **Code Generation** - When generating .kir from other languages

## .kirb Format (Binary)

Optimized binary format for production deployment.

### Features

- **5-10× smaller** - Significantly reduced file size
- **Faster parsing** - Optimized for quick deserialization
- **Production ready** - Designed for distribution
- **Backwards compatible** - Can read older versions

### Size Comparison

```
button_demo.kir   →  12.3 KB (JSON)
button_demo.kirb  →   2.1 KB (binary)  [83% smaller]

animations_demo.kir   →  45.2 KB (JSON)
animations_demo.kirb  →   6.8 KB (binary)  [85% smaller]
```

### When to Use

- **Production Apps** - Ship smaller binaries
- **Embedded Systems** - Constrain memory usage
- **Distribution** - Reduce download/install size
- **Performance** - Faster app startup time

## Working with Formats

### Compilation

Compile source code directly to either format:

```bash
# Compile to .kir (default)
kryon compile app.nim

# Compile to .kirb (binary)
kryon compile app.nim --format=binary

# Compile .kry to .kir
kryon parse app.kry
```

### Conversion

Convert between formats:

```bash
# Convert .kir to .kirb
kryon convert app.kir app.kirb

# Convert .kirb to .kir (for debugging)
kryon convert app.kirb app.kir
```

### Running

Both formats can be executed directly:

```bash
# Run JSON format
kryon run app.kir

# Run binary format
kryon run app.kirb
```

## Format Validation

Validate IR files before deployment:

```bash
# Validate .kir
kryon validate app.kir

# Validate .kirb
kryon validate app.kirb
```

The validator checks:
- ✅ Format version compatibility
- ✅ Component tree structure
- ✅ Property types and values
- ✅ Required fields present
- ✅ ID uniqueness

## IR Pipeline

All Kryon frontends compile to the same IR format:

```
.kry  → .kir → renderer
.nim  → .kir → renderer
.rs   → .kir → renderer
.lua  → .kir → renderer
.c    → .kir → renderer
```

Optional binary conversion:

```
.kir → .kirb → renderer (production)
```

## Technical Details

### .kir Schema (v3.0)

```typescript
interface IRDocument {
  version: string;        // "3.0"
  root: IRComponent;
}

interface IRComponent {
  type: ComponentType;    // "COLUMN", "TEXT", "BUTTON", etc.
  id: string;             // Unique identifier
  properties: {
    [key: string]: string | number;
  };
  children?: IRComponent[];
}
```

### .kirb Format

The binary format uses:
- **Variable-length encoding** for integers
- **String interning** for repeated values
- **Component type enums** (1 byte vs strings)
- **Delta encoding** for similar components
- **Optional zlib compression** for text content

### Version History

| Version | Format | Features |
|---------|--------|----------|
| 3.0 | .kir / .kirb | Current, Rust support |
| 2.1 | .kir | Reactive state, animations |
| 2.0 | .kir | Binary format introduced |
| 1.0 | .kir | Initial JSON format |

## Best Practices

### Development Workflow

1. **Write code** in your preferred language (.kry, .nim, .rs)
2. **Compile to .kir** for development and debugging
3. **Test with .kir** to inspect component trees
4. **Convert to .kirb** for production builds
5. **Ship .kirb** in your final application

### Version Control

```bash
# Check in source files only
git add examples/kry/*.kry
git add src/*.nim

# Don't check in compiled IR (add to .gitignore)
echo "*.kir" >> .gitignore
echo "*.kirb" >> .gitignore
```

### Performance

For production apps:
- ✅ Use `.kirb` format (smaller, faster)
- ✅ Enable compression if targeting web
- ✅ Pre-compile all UIs at build time
- ✅ Use IR caching during development

## Inspection Tools

### View Component Tree

```bash
# Visualize structure
kryon tree app.kir

# With component details
kryon tree app.kir --visual

# Limit depth
kryon tree app.kir --max-depth=5
```

Example output:
```
Column #1 (800px×600px) [bg:#2c2c2c]
├── Text #2 [color:#ffffff] "Hello Kryon"
└── Button #3 (120px×40px) [bg:#3d3d3d] "Click Me"
```

### Detailed Analysis

```bash
# Full IR analysis
kryon inspect-detailed app.kir

# Include tree visualization
kryon inspect-detailed app.kir --tree
```

Shows:
- Total component count
- Component type distribution
- Tree depth statistics
- Style usage
- Text content analysis
- Warnings (large trees, deep nesting)

## See Also

- [IR Pipeline](ir-pipeline.md) - How frontends compile to IR
- [Developer Guide](developer-guide.md) - Building and debugging
- [CLI Reference](#) - All kryon commands
