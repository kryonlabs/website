# Markdown Frontend

Kryon treats Markdown as a first-class frontend language. Write your UI in Markdown, and Kryon will compile it to KIR and render it on any target (Web, Desktop, Terminal).

## Overview

Kryon's Markdown support goes beyond simple document rendering - it's a full-featured document UI system with:

- **Custom AST-based parser** written in C for maximum performance
- **CommonMark + GFM compliance** with extended syntax
- **Cross-platform rendering** - same markdown renders identically on web, desktop, and terminal
- **Interactive components** - mix markdown with buttons, inputs, and other UI elements
- **Syntax highlighting** via plugin system
- **Theme support** for consistent styling

## Quick Start

```bash
# Run markdown directly
kryon run README.md

# Compile to KIR
kryon compile README.md --output=README.kir

# Generate HTML website
kryon build README.md --target=web

# Render to terminal
kryon run README.md --renderer=terminal
```

## Supported Markdown Features

### Basic Syntax

| Feature | Syntax | Output |
|---------|--------|--------|
| Heading 1 | `# Heading` | Large heading |
| Heading 2-6 | `##` through `######` | Nested headings |
| Bold | `**bold**` or `__bold__` | **Bold text** |
| Italic | `*italic*` or `_italic_` | *Italic text* |
| Strikethrough | `~~strikethrough~~` | ~~Strikethrough~~ |
| Inline code | `` `code` `` | `Inline code` |
| Link | `[text](url)` | Clickable link |
| Image | `![alt](url)` | Embedded image |
| Blockquote | `> quote` | Quoted text |
| Horizontal rule | `---` | Visual separator |
| Unordered list | `- item` or `* item` | Bulleted list |
| Ordered list | `1. item` | Numbered list |

### Extended Features (GFM)

| Feature | Syntax | Notes |
|---------|--------|-------|
| Fenced code blocks | ` ```language ` | With syntax highlighting |
| Task lists | `- [x] Done` | Checkboxes |
| Tables | ` \| col \| \| ` | With alignment support |
| Autolinks | `https://example.com` | Auto-converted to links |

### Code Blocks with Syntax Highlighting

````markdown
```nim
proc greet(name: string) =
  echo "Hello, " & name

greet("World")
```
````

Supported languages (via syntax plugin):
- C, C++, Java, C#, Swift, Kotlin, Scala, Dart
- JavaScript, TypeScript, Python, Rust, Go
- Bash, JSON, HTML, KRY

### Tables

```markdown
| Feature | Status | Notes |
|---------|--------|-------|
| Grid | ✅ | Full CSS Grid support |
| Flexbox | ✅ | Complete flex layout |
| Markdown | ✅ | First-class frontend |
```

### Task Lists

```markdown
- [x] Design system
- [x] Implement core components
- [ ] Add animation system
- [ ] Write documentation
```

## Component Integration

Markdown documents can include interactive Kryon components:

### Inline Components

```markdown
# Welcome

Here's a counter app embedded in markdown:

<Counter value={0} />

Want to try something else?

<Button label="Click Me" onClick={handleClick} />
```

### Mixed Content

```markdown
# Dashboard

Your stats:

<StatsCard title="Users" value={1234} />

## Recent Activity

- User registered
- Order completed
- Payment received

<ActionButton label="Refresh" />
```

## CLI Usage

### Running Markdown Files

```bash
# Run with default renderer (SDL3)
kryon run README.md

# Run with specific renderer
kryon run README.md --renderer=web
kryon run README.md --renderer=terminal

# Open browser for web output
kryon run README.md --renderer=web --serve
```

### Compiling to KIR

```bash
# Compile to KIR
kryon compile README.md

# Custom output path
kryon compile README.md --output=output.kir

# With debug info
kryon compile README.md --debug

# Validate only
kryon compile README.md --validate
```

### Code Generation

```bash
# Generate HTML
kryon codegen html README.kir --output=dist/

# Generate TypeScript
kryon codegen tsx README.kir --output=src/

# Generate back to Markdown (round-trip)
kryon codegen markdown README.kir --output=output.md
```

## Styling Markdown

### Web Styling

When targeting web, markdown is converted to semantic HTML:

```markdown
# Heading → <h1>
**bold** → <strong>
*italic* → <em>
`code` → <code>
```

Generated HTML includes CSS classes for easy styling:

```css
.markdown h1 { color: var(--heading-color); }
.markdown code { background: var(--code-bg); }
.markdown blockquote { border-left: 4px solid var(--accent); }
```

### Desktop Styling

Desktop rendering uses the theme system:

```c
// Set theme (C API)
ir_markdown_set_theme(IR_THEME_DARK);
// Options: IR_THEME_LIGHT, IR_THEME_DARK, IR_THEME_GITHUB
```

## Configuration

### Markdown Options (kryon.toml)

```toml
[markdown]
# Enable GFM extensions
gfm = true

# Syntax highlighting theme
syntax_theme = "dark"  # light, dark, github

# Table alignment
table_align = "left"   # left, center, right

# Task list rendering
task_list_interactive = true

# Code block line numbers
line_numbers = false
```

### Custom Renderers

```c
// Register custom markdown renderer
void ir_markdown_register_renderer(
    const char* element_type,
    IRComponent* (*renderer)(const char* content, void* userdata)
);
```

## Examples

### Documentation Site

```markdown
# My Project

## Installation

```bash
npm install my-project
```

## Usage

<ExampleDemo code="basic" />

## API Reference

See the [API docs](./api.md) for details.
```

Build:
```bash
kryon build docs/index.md --target=web
```

### Interactive Tutorial

```markdown
# Tutorial: Step 1

Welcome! Click Next to continue.

<NextButton onClick={goToStep2} />

---

# Tutorial: Step 2

Now let's build your first component.

<CodeEditor language="tsx" template={starterTemplate} />

<RunButton />
```

### Blog Post with Interactive Elements

```markdown
# Introducing Kryon 2.0

Today we're excited to announce Kryon 2.0 with major improvements:

## New Features

- **CSS Grid Support**: Full 2D layout capabilities
- **Markdown Frontend**: Write UIs in markdown
- **Plugin System**: Extend with custom components

<FeatureHighlight feature="grid" />

## Try It Now

<LiveDemo src="/examples/grid.kry" />

## What's Next?

<FeedbackForm />
```

## IR Pipeline

Markdown follows the same IR pipeline as other frontends:

```
.md source
    ↓
Markdown Parser (AST)
    ↓
IR Component Tree
    ↓
KIR (.kir binary)
    ↓
Renderer / Codegen
    ↓
Web / Desktop / Terminal
```

### IR Component Types

Markdown is mapped to specific IR components:

| Markdown | IR Component | HTML Output |
|----------|--------------|-------------|
| `# Heading` | `IR_COMPONENT_HEADING` | `<h1>` |
| Paragraph | `IR_COMPONENT_PARAGRAPH` | `<p>` |
| `**bold**` | `IR_COMPONENT_STRONG` | `<strong>` |
| `*italic*` | `IR_COMPONENT_EM` | `<em>` |
| `` `code` `` | `IR_COMPONENT_CODE_INLINE` | `<code>` |
| Code block | `IR_COMPONENT_CODE_BLOCK` | `<pre><code>` |
| `- item` | `IR_COMPONENT_LIST` | `<ul><li>` |
| `1. item` | `IR_COMPONENT_LIST` | `<ol><li>` |
| `> quote` | `IR_COMPONENT_BLOCKQUOTE` | `<blockquote>` |
| `---` | `IR_COMPONENT_HORIZONTAL_RULE` | `<hr>` |
| `[link](url)` | `IR_COMPONENT_LINK` | `<a>` |
| `![alt](url)` | `IR_COMPONENT_IMAGE` | `<img>` |

## Limitations

- HTML inside markdown is not supported (use component embedding instead)
- Footnotes are not yet implemented
- Definition lists are not yet implemented
- Math equations (LaTeX) require plugin

## Best Practices

1. **Use semantic headings** - Start with `#` and nest properly
2. **Keep lines under 80 chars** - For better terminal rendering
3. **Use fenced code blocks** - For syntax highlighting
4. **Add alt text to images** - For accessibility
5. **Use tables sparingly** - Complex tables may not render well in terminal
6. **Test on multiple targets** - Web, desktop, terminal

## See Also

- [Web Features Reference](/docs/web-features) - HTML/CSS support
- [Codegens](/docs/codegens) - Code generation from KIR
- [CLI Reference](/docs/cli-reference) - Complete CLI documentation
