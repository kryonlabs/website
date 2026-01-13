# Web Features Reference

Complete reference for HTML elements and CSS properties supported by Kryon's web target (HTML/CSS/JS codegen).

## Overview

Kryon's web codegen transpiles Kryon IR to browser-ready HTML, CSS, and JavaScript. The IR parser supports a comprehensive set of HTML elements and CSS properties for building modern web applications.

## HTML Elements

### Layout Containers

| Element | IR Component | Attributes | Notes |
|---------|--------------|------------|-------|
| `div` | Container | id, class, style | Generic block container |
| `span` | Span | id, class, style | Inline container |
| `main` | Container | id, class, style | Main content area |
| `section` | Container | id, class, style | Document section |
| `article` | Container | id, class, style | Self-contained content |
| `nav` | Container | id, class, style | Navigation section |
| `header` | Container | id, class, style | Page or section header |
| `footer` | Container | id, class, style | Page or section footer |
| `aside` | Container | id, class, style | Sidebar content |
| `figure` | Container | id, class, style | Figure with optional caption |
| `figcaption` | Container | id, class, style | Figure caption |

### Text Content

| Element | IR Component | Attributes | Notes |
|---------|--------------|------------|-------|
| `h1`-`h6` | Heading | id, class, style, data-level | Headings levels 1-6 |
| `p` | Paragraph | id, class, style | Paragraph text |
| `blockquote` | Blockquote | id, class, style | Block quotation |
| `pre` | CodeBlock | id, class, style | Preformatted text |
| `hr` | HorizontalRule | id, class, style | Thematic break |

### Lists

| Element | IR Component | Attributes | Notes |
|---------|--------------|------------|-------|
| `ul` | List | id, class, style | Unordered list |
| `ol` | List | id, class, style, start | Ordered list (start attribute) |
| `li` | ListItem | id, class, style | List item |

### Tables

| Element | IR Component | Attributes | Notes |
|---------|--------------|------------|-------|
| `table` | Table | id, class, style | Table element |
| `thead` | TableHead | id, class, style | Table header |
| `tbody` | TableBody | id, class, style | Table body |
| `tfoot` | TableFoot | id, class, style | Table footer |
| `tr` | TableRow | id, class, style | Table row |
| `td` | TableCell | id, class, style, colspan, rowspan | Table data cell |
| `th` | TableHeaderCell | id, class, style, colspan, rowspan | Table header cell |

### Form Elements

| Element | IR Component | Attributes | Notes |
|---------|--------------|------------|-------|
| `button` | Button | id, class, style, type | Clickable button |
| `input` | Input | id, class, style, type, value, placeholder, name, maxlength, minlength, required, readonly, disabled | Text input (limited type support) |
| `textarea` | Textarea | id, class, style, rows, cols, placeholder | Multi-line text input |
| `select` | Dropdown | id, class, style | Selection dropdown |
| `label` | Span | id, class, style, for | Form label |

### Media

| Element | IR Component | Attributes | Notes |
|---------|--------------|------------|-------|
| `img` | Image | id, class, style, src, alt | Image display |
| `a` | Link | id, class, style, href, target, rel | Hyperlink |

### Inline Text Elements

| Element | IR Component | Attributes | Notes |
|---------|--------------|------------|-------|
| `strong`, `b` | Strong | id, class, style | Bold text |
| `em`, `i` | Em | id, class, style | Italic text |
| `code` | CodeInline | id, class, style | Inline code |
| `small` | Small | id, class, style | Small text |
| `mark` | Mark | id, class, style | Highlighted text |

### Ignored Elements

The following HTML elements are ignored during parsing (not rendered):

- `head`, `meta`, `title`, `script`, `link`, `style`, `noscript`

## CSS Properties

### Dimensions & Layout

| Property | Values | Units | Notes |
|----------|--------|-------|-------|
| `width` | number, auto | px, %, rem, em | Component width |
| `height` | number, auto | px, %, rem, em | Component height |
| `min-width` | number | px, %, rem, em | Minimum width |
| `max-width` | number | px, %, rem, em | Maximum width |
| `min-height` | number | px, %, rem, em | Minimum height |
| `max-height` | number | px, %, rem, em | Maximum height |
| `aspect-ratio` | number/ratio | - | Width-to-height ratio |
| `margin` | 1-4 values | px, %, rem, em | Shorthand for all margins |
| `margin-top` | number | px, %, rem, em | Top margin |
| `margin-right` | number | px, %, rem, em | Right margin |
| `margin-bottom` | number | px, %, rem, em | Bottom margin |
| `margin-left` | number | px, %, rem, em | Left margin |
| `padding` | 1-4 values | px, %, rem, em | Shorthand for all padding |
| `padding-top` | number | px, %, rem, em | Top padding |
| `padding-right` | number | px, %, rem, em | Right padding |
| `padding-bottom` | number | px, %, rem, em | Bottom padding |
| `padding-left` | number | px, %, rem, em | Left padding |
| `gap` | number | px, %, rem, em | Gap between flex/grid items |

### Colors & Backgrounds

| Property | Values | Notes |
|----------|--------|-------|
| `background-color` | color, var() | Solid background color |
| `background` | color, gradient | Supports linear-gradient, radial-gradient |
| `background-clip` | text, content-box, padding-box, border-box | Background painting area |
| `-webkit-text-fill-color` | color | Text fill color (for gradient text) |
| `color` | color, var() | Text color |

### Borders

| Property | Values | Units | Notes |
|----------|--------|-------|-------|
| `border` | width style color | px, any color | Shorthand border |
| `border-color` | color, var() | - | Border color |
| `border-top` | width style color | px | Top border |
| `border-right` | width style color | px | Right border |
| `border-bottom` | width style color | px | Bottom border |
| `border-left` | width style color | px | Left border |
| `border-radius` | 1-4 values | px, % | Corner rounding |
| `border-top-left-radius` | value | px, % | Top-left corner |
| `border-top-right-radius` | value | px, % | Top-right corner |
| `border-bottom-left-radius` | value | px, % | Bottom-left corner |
| `border-bottom-right-radius` | value | px, % | Bottom-right corner |

### Typography

| Property | Values | Units | Notes |
|----------|--------|-------|-------|
| `font-size` | number | px, rem, em | Text size |
| `font-weight` | 100-900, bold, normal | - | Text weight |
| `font-style` | italic, normal | - | Text style |
| `font-family` | name(s) | - | Font family with quote handling |
| `text-align` | left, right, center, justify | - | Horizontal text alignment |
| `line-height` | number | multiplier | Line spacing |
| `letter-spacing` | number | px, em | Character spacing |
| `word-spacing` | number | px, em | Word spacing |
| `text-decoration` | none, underline, line-through, overline | - | Text decoration |
| `text-overflow` | clip, ellipsis, fade, visible | - | Overflow text handling |
| `white-space` | normal, nowrap, pre, pre-wrap, pre-line | - | Whitespace handling |

### Flexbox

| Property | Values | Notes |
|----------|--------|-------|
| `display` | flex, inline-flex | Enable flex layout |
| `flex-direction` | row, column | Main axis direction |
| `flex-wrap` | wrap, nowrap | Wrap behavior |
| `justify-content` | flex-start, flex-end, center, space-between, space-around, space-evenly | Main axis alignment |
| `align-items` | flex-start, flex-end, center, baseline, stretch | Cross axis alignment |
| `align-content` | flex-start, flex-end, center, space-between, space-around, stretch | Line alignment |
| `flex-grow` | number | Grow factor |
| `flex-shrink` | number | Shrink factor |
| `flex-basis` | size | Base size |

### CSS Grid

| Property | Values | Units | Notes |
|----------|--------|-------|-------|
| `display` | grid, inline-grid | Enable grid layout |
| `grid-template-columns` | track list | px, %, fr, auto, min-content, max-content | Column track definitions |
| `grid-template-rows` | track list | px, %, fr, auto, min-content, max-content | Row track definitions |
| `grid-gap` | 1-2 values | px, % | Row and column gap (shorthand) |
| `grid-row-gap` | value | px, % | Row gap |
| `grid-column-gap` | value | px, % | Column gap |
| `grid-auto-flow` | row, column | Auto-placement algorithm |
| `grid-area` | row-start / col-start / row-end / col-end | - | Grid area placement |
| `grid-row` | start / end, span N | - | Row placement |
| `grid-column` | start / end, span N | - | Column placement |
| `align-self` | start, end, center, stretch | - | Override align-items |
| `justify-self` | start, end, center, stretch | - | Override justify-items |

### Transform & Effects

| Property | Values | Units | Notes |
|----------|--------|-------|-------|
| `transform` | translate, scale, rotate | px, deg, % | 2D transforms |
| `transform-origin` | x y | px, %, left, center, right | Transform origin point |
| `opacity` | 0.0 - 1.0 | - | Transparency level |
| `cursor` | auto, default, pointer, wait, text, move, not-allowed, grab, grabbing, crosshair, help, progress | - | Mouse cursor |
| `pointer-events` | auto, none, visiblePainted | - | Pointer event handling |
| `object-fit` | fill, contain, cover, none, scale-down | - | Replaced element sizing |
| `box-shadow` | offset blur spread inset | px, color | Drop shadow |
| `filter` | filter functions | - | Visual filters |

### Positioning (Limited Support)

| Property | Values | Notes |
|----------|--------|-------|
| `position` | absolute | Limited absolute positioning support |
| `top`, `left` | size | Position offset (with absolute) |
| `z-index` | number | Stacking order |

## CSS Variables

Kryon supports CSS custom properties (variables) using the `var()` function:

```css
color: var(--text-color);
background-color: var(--primary-color);
border-color: var(--border-color);
```

Variables are resolved during IR processing and can be defined in the source CSS.

## Gradients

The `background` property supports gradient functions:

```css
/* Linear gradient */
background: linear-gradient(90deg, #ff0000, #0000ff);

/* Radial gradient */
background: radial-gradient(circle, #ff0000, #0000ff);
```

## Unsupported CSS Features

The following CSS features are **not** currently supported:

- `float` and `clear`
- `:hover`, `:active`, `:focus` pseudo-classes (use event handlers instead)
- Media queries (inline)
- `@keyframes` and CSS animations (use IR animations instead)
- `calc()` function
- `min()`, `max()`, `clamp()` functions
- Blend modes (`mix-blend-mode`)
- Masking and clip-path
- CSS Grid auto-placement with dense packing
- Complex selectors (class, ID, attribute combinations)

## Form Element Limitations

### Input Types

The `<input>` element stores the `type` attribute but has limited handling:

| Type | Status | Notes |
|------|--------|-------|
| `text` | Supported | Default text input |
| `password` | Partial | Attribute stored |
| `email` | Partial | Attribute stored |
| `number` | Partial | Attribute stored |
| `date` | Partial | Attribute stored |
| `range` | Partial | Attribute stored |
| `color` | Partial | Attribute stored |
| `file` | Not supported | - |
| `checkbox` | Use `<input type="checkbox">` | As separate element |

### Missing Form Elements

The following form elements are not supported:

- `<datalist>`, `<optgroup>`
- `<fieldset>`, `<legend>`
- `<meter>`, `<progress>`
- `<details>`, `<summary>`

## Data Attributes for Round-trip

Kryon preserves metadata using data attributes for round-trip compatibility:

- `data-ir-type` - Component type
- `data-ir-id` - Component ID
- `data-level` - Heading level
- `data-list-type` - List type (ordered/unordered)
- `data-checked` - Checkbox state
- `data-value` - Input value

## Usage Example

```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
  <header style="grid-column: 1 / -1; padding: 20px; background: #f0f0f0;">
    <h1 style="color: var(--heading-color);">Welcome</h1>
  </header>

  <section style="padding: 20px;">
    <h2>Features</h2>
    <ul style="gap: 10px;">
      <li>Grid Layout</li>
      <li>Flexbox</li>
      <li>CSS Variables</li>
    </ul>
  </section>

  <section style="padding: 20px;">
    <h2>Contact</h2>
    <form>
      <label for="email">Email:</label>
      <input id="email" type="email" placeholder="you@example.com" />
      <button type="submit">Submit</button>
    </form>
  </section>
</div>
```

## See Also

- [Codegens Documentation](./codegens.md) - Web codegen details
- [Getting Started](./getting-started.md) - Quick start guide
- [Targets](./targets.md) - All rendering targets
