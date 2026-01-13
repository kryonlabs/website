# Kryon TypeScript Bindings

TypeScript/JSX bindings for the Kryon UI Framework using Bun's native FFI. Write UIs with familiar React-like JSX syntax and target multiple rendering backends (SDL3, Raylib, Terminal) or transpile to HTML.

## Why TypeScript?

- **Familiar JSX syntax** - Use React-like components
- **Type safety** - Full TypeScript support with autocomplete
- **Fast runtime** - Bun's native FFI for C library calls
- **Hot reload** - Quick iteration during development
- **Multiple targets** - SDL3/Raylib desktop, Terminal UI, or Web (HTML)
- **React hooks** - Full support: useState, useEffect, useCallback, useMemo, useReducer

## Requirements

- [Bun](https://bun.sh/) >= 1.0.0
- Kryon C libraries:
  - `libkryon_ir.so` (always required)
  - `libkryon_desktop.so` (for SDL3 rendering)
  - `libkryon_web.so` (for HTML transpilation)

## Installation

```bash
# Clone Kryon
git clone https://github.com/kryonlabs/kryon.git
cd kryon

# Build C libraries
make build

# Install Bun dependencies
cd bindings/typescript
bun install
```

## Usage

### Hello World

```tsx
import { run } from 'kryon';

function App() {
  return (
    <column width="100%" height="100%" gap={20} align="center" justify="center">
      <text content="Hello World!" fontSize={24} />
      <button title="Click Me" />
    </column>
  );
}

run(<App />, {
  title: 'My App',
  width: 800,
  height: 600,
});
```

### Running Examples

```bash
# Make sure libkryon_desktop.so is built
cd ../..
make build

# Run hello world example
bun run examples/typescript/hello_world.tsx
```

## Components

### Layout Components
- `<row>` - Horizontal flex container
- `<column>` - Vertical flex container
- `<center>` - Center content
- `<container>` - Generic container (with grid support via `display: "grid"`)
- `<grid>` - CSS Grid layout container

### Content Components
- `<text>` - Text display
- `<button>` - Clickable button
- `<input>` - Text input
- `<checkbox>` - Checkbox control
- `<dropdown>` - Dropdown selector

### Props

All components support these common props:
- `width`, `height` - Size (number for px, string like "50%" or "auto")
- `minWidth`, `maxWidth`, `minHeight`, `maxHeight` - Constrained sizes
- `padding`, `margin` - Spacing (number or [top, right, bottom, left])
- `backgroundColor` - Background color (hex string like "#ff0000", or gradient like "linear-gradient(90deg, red, blue)")
- `opacity` - Opacity (0.0 to 1.0)
- `zIndex` - Stack order
- `borderRadius` - Corner rounding (number or [top-left, top-right, bottom-right, bottom-left])
- `borderWidth`, `borderColor` - Border styling
- `boxShadow` - Drop shadow effect
- `transform` - 2D transforms
- `cursor` - Mouse cursor style
- `display` - "flex", "grid", "block", "inline-flex", "inline-grid"

Layout components also support:
- `gap` - Space between children
- `justify` - Main axis alignment (start, center, end, space-between, space-around, space-evenly)
- `align` - Cross axis alignment (start, center, end)

Text components also support:
- `fontSize` - Font size in px
- `fontWeight` - "normal", "bold", or 100-900
- `fontStyle` - "normal", "italic"
- `fontFamily` - Font family name
- `textAlign` - "left", "center", "right", "justify"
- `lineHeight` - Line height multiplier
- `letterSpacing` - Character spacing
- `wordSpacing` - Word spacing
- `textDecoration` - "none", "underline", "line-through", "overline"
- `textOverflow` - "clip", "ellipsis"

Grid layout also supports:
- `gridTemplateColumns` - Column track definitions (e.g., "1fr 1fr 1fr" or "repeat(3, 1fr)")
- `gridTemplateRows` - Row track definitions
- `gridAutoFlow` - "row" or "column"
- `alignSelf`, `justifySelf` - Per-item alignment

## React Hooks

Kryon TypeScript supports full React hooks for reactive state management and side effects.

### useState

Manage component state with automatic type inference from initial values.

```tsx
import { useState } from 'kryon';

function Counter() {
  // Type inferred as number
  const [count, setCount] = useState(0);

  return (
    <column gap={10}>
      <text content={`Count: ${count}`} />
      <button title="Increment" onClick={() => setCount(count + 1)} />
    </column>
  );
}
```

**Type Inference:** The type is automatically inferred from the initial value (`0` → `number`, `""` → `string`, `[]` → `array`).

### useEffect

Run side effects like data fetching, subscriptions, or DOM manipulation.

```tsx
import { useEffect, useState } from 'kryon';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []); // Empty dependency array = run once on mount

  return <text content={`Time: ${seconds}s`} />;
}
```

### useCallback

Memoize callback functions to prevent unnecessary re-renders.

```tsx
import { useState, useCallback } from 'kryon';

function Form() {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(() => {
    console.log('Submitted:', value);
  }, [value]); // Only recreated when `value` changes

  return (
    <column gap={10}>
      <input value={value} onChange={setValue} />
      <button title="Submit" onClick={handleSubmit} />
    </column>
  );
}
```

### useMemo

Memoize expensive computations.

```tsx
import { useState, useMemo } from 'kryon';

function ExpensiveList({ items }: { items: number[] }) {
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(n => n.toString().includes(filter));
  }, [items, filter]); // Only recompute when items or filter changes

  return (
    <column gap={5}>
      <input value={filter} onChange={setFilter} placeholder="Filter..." />
      {filteredItems.map(n => <text content={n.toString()} />)}
    </column>
  );
}
```

### useReducer

Manage complex state logic with a reducer function.

```tsx
import { useReducer } from 'kryon';

type State = { count: number; step: number };
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'setStep'; step: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    case 'decrement': return { ...state, count: state.count - state.step };
    case 'setStep': return { ...state, step: action.step };
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <column gap={10}>
      <text content={`Count: ${state.count}`} />
      <text content={`Step: ${state.step}`} />
      <row gap={10}>
        <button title="-" onClick={() => dispatch({ type: 'decrement' })} />
        <button title="Step 1" onClick={() => dispatch({ type: 'setStep', step: 1 })} />
        <button title="Step 5" onClick={() => dispatch({ type: 'setStep', step: 5 })} />
        <button title="+" onClick={() => dispatch({ type: 'increment' })} />
      </row>
    </column>
  );
}
```

### Type Inference

All hooks support automatic type inference from initial values:

```tsx
// Types are inferred: number, string, string[], boolean
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [items, setItems] = useState([]);
const [isActive, setIsActive] = useState(false);

// Explicit type also works
const [data, setData] = useState<{ id: number; value: string } | null>(null);
```

## Complete Examples

### Counter App (State Management)

```tsx
import { run, useState } from 'kryon';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <column gap={20} padding={40} align="center">
      <text content={`Count: ${count}`} fontSize={32} />

      <row gap={10}>
        <button
          title="Decrement"
          width={120}
          height={50}
          backgroundColor="#e74c3c"
          onClick={() => setCount(count - 1)}
        />
        <button
          title="Reset"
          width={120}
          height={50}
          backgroundColor="#95a5a6"
          onClick={() => setCount(0)}
        />
        <button
          title="Increment"
          width={120}
          height={50}
          backgroundColor="#2ecc71"
          onClick={() => setCount(count + 1)}
        />
      </row>
    </column>
  );
}

run(<Counter />, {
  title: 'Counter App',
  width: 500,
  height: 300,
});
```

### Todo List

```tsx
import { run, useState } from 'kryon';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input, done: false }
      ]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  return (
    <column width="100%" height="100%" padding={40} gap={20}>
      <text content="Todo List" fontSize={28} fontWeight="bold" />

      <row gap={10}>
        <input
          placeholder="Enter task..."
          value={input}
          onChange={setInput}
          width={400}
          height={40}
        />
        <button
          title="Add"
          width={100}
          height={40}
          backgroundColor="#3498db"
          onClick={addTodo}
        />
      </row>

      <column gap={10}>
        {todos.map(todo => (
          <row key={todo.id} gap={10} padding={10} backgroundColor="#ecf0f1">
            <checkbox
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <text
              content={todo.text}
              fontSize={16}
              color={todo.done ? "#95a5a6" : "#2c3e50"}
            />
          </row>
        ))}
      </column>
    </column>
  );
}

run(<TodoApp />, {
  title: 'Todo List',
  width: 600,
  height: 800,
});
```

### Dashboard Layout

```tsx
import { run } from 'kryon';

function Card({ title, value, color }: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <column
      width={200}
      padding={20}
      gap={10}
      backgroundColor={color}
      borderRadius={10}
    >
      <text content={title} fontSize={14} color="#ecf0f1" />
      <text content={String(value)} fontSize={32} fontWeight="bold" color="white" />
    </column>
  );
}

function Dashboard() {
  return (
    <column width="100%" height="100%" padding={40} gap={30} backgroundColor="#ecf0f1">
      <text content="Analytics Dashboard" fontSize={32} fontWeight="bold" />

      <row gap={20} wrap>
        <Card title="Users" value={1234} color="#3498db" />
        <Card title="Revenue" value="$45.2k" color="#2ecc71" />
        <Card title="Orders" value={892} color="#e74c3c" />
        <Card title="Growth" value="+24%" color="#f39c12" />
      </row>

      <column
        padding={30}
        backgroundColor="white"
        borderRadius={10}
        gap={15}
      >
        <text content="Recent Activity" fontSize={20} fontWeight="bold" />
        <text content="User john@example.com registered" fontSize={14} color="#7f8c8d" />
        <text content="Order #4521 completed" fontSize={14} color="#7f8c8d" />
        <text content="Payment received: $129.99" fontSize={14} color="#7f8c8d" />
      </column>
    </column>
  );
}

run(<Dashboard />, {
  title: 'Dashboard',
  width: 1200,
  height: 800,
});
```

### Form Validation

```tsx
import { run, useState } from 'kryon';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    console.log('Login successful:', { email, password });
  };

  return (
    <column
      width={400}
      padding={40}
      gap={20}
      backgroundColor="white"
      borderRadius={15}
    >
      <text content="Login" fontSize={28} fontWeight="bold" />

      <column gap={15}>
        <text content="Email" fontSize={14} fontWeight="bold" />
        <input
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          width="100%"
          height={40}
        />

        <text content="Password" fontSize={14} fontWeight="bold" />
        <input
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={setPassword}
          width="100%"
          height={40}
        />

        {error && (
          <text content={error} fontSize={14} color="#e74c3c" />
        )}

        <button
          title="Sign In"
          width="100%"
          height={50}
          backgroundColor="#3498db"
          color="white"
          onClick={handleSubmit}
        />
      </column>

      <row gap={5} justify="center">
        <text content="Don't have an account?" fontSize={12} color="#7f8c8d" />
        <text content="Sign up" fontSize={12} color="#3498db" />
      </row>
    </column>
  );
}

run(<LoginForm />, {
  title: 'Login',
  width: 500,
  height: 600,
  backgroundColor: '#ecf0f1',
});
```

## Rendering Backends

### SDL3 (Desktop) - Default

```bash
# Run with SDL3 renderer (default)
bun run app.tsx

# Or explicitly
KRYON_RENDERER=sdl3 bun run app.tsx
```

### Terminal Renderer

```bash
# Run in terminal (TUI)
KRYON_RENDERER=terminal bun run app.tsx
```

### HTML/Web Codegen

```bash
# Transpile to HTML
KRYON_RENDERER=web bun run app.tsx

# Outputs app.html, app.css
```

## Component Styling

### Colors

```tsx
<container
  backgroundColor="#3498db"  // Hex color
  borderColor="#2980b9"
  color="white"              // Text color
/>
```

### Sizing

```tsx
<column
  width={400}         // Fixed pixels
  height="50%"        // Percentage
  minWidth={200}
  maxWidth={600}
/>
```

### Spacing

```tsx
<container
  padding={20}                      // All sides
  paddingTop={10}
  paddingBottom={10}
  margin={15}
  gap={10}                          // Gap between children
/>
```

### Borders

```tsx
<container
  borderWidth={2}
  borderColor="#95a5a6"
  borderRadius={10}
/>
```

### Typography

```tsx
<text
  fontSize={18}
  fontWeight="bold"              // normal, bold
  color="#2c3e50"
  textAlign="center"             // left, center, right
/>
```

## Flexbox Layout

### Column (Vertical)

```tsx
<column
  gap={15}
  justify="start"        // start, center, end, space-between
  align="center"         // start, center, end, stretch
>
  <text content="Item 1" />
  <text content="Item 2" />
  <text content="Item 3" />
</column>
```

### Row (Horizontal)

```tsx
<row
  gap={10}
  justify="space-between"
  align="center"
  wrap                   // Enable wrapping
>
  <button title="Left" />
  <button title="Center" />
  <button title="Right" />
</row>
```

## Grid Layout

Kryon supports full CSS Grid layout for complex 2D layouts.

### Basic Grid

```tsx
<container
  display="grid"
  gridTemplateColumns="1fr 1fr 1fr"
  gridTemplateRows="auto"
  gap={20}
>
  <text content="Cell 1" />
  <text content="Cell 2" />
  <text content="Cell 3" />
  <text content="Cell 4" />
  <text content="Cell 5" />
  <text content="Cell 6" />
</container>
```

### Grid with Named Areas

```tsx
<container
  display="grid"
  gridTemplateColumns="200px 1fr 200px"
  gridTemplateRows="auto 1fr auto"
  gap={10}
>
  <container style={{ gridArea: "1 / 1 / 2 / 4" }}>
    <text content="Header" />
  </container>
  <container style={{ gridArea: "2 / 1 / 3 / 2" }}>
    <text content="Sidebar" />
  </container>
  <container style={{ gridArea: "2 / 2 / 3 / 3" }}>
    <text content="Main Content" />
  </container>
  <container style={{ gridArea: "2 / 3 / 3 / 4" }}>
    <text content="Ads" />
  </container>
  <container style={{ gridArea: "3 / 1 / 4 / 4" }}>
    <text content="Footer" />
  </container>
</container>
```

### Grid Item Placement

```tsx
<container display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={10}>
  <container style={{ gridColumn: "1 / 3" }}>
    <text content="Spans 2 columns" />
  </container>
  <container style={{ gridRow: "2 / 4" }}>
    <text content="Spans 2 rows" />
  </container>
  <container>
    <text content="Normal cell" />
  </container>
</container>
```

## Event Handlers

```tsx
function Interactive() {
  const [clicked, setClicked] = useState(false);

  return (
    <column gap={20}>
      <button
        title="Click Me"
        onClick={() => setClicked(true)}
      />

      <input
        placeholder="Type here..."
        onChange={(value) => console.log('Input:', value)}
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
      />

      <checkbox
        checked={clicked}
        onChange={setClicked}
      />
    </column>
  );
}
```

## Build Integration

### Development

```bash
# Watch mode with hot reload
bun --watch run app.tsx

# Debug mode
DEBUG=1 bun run app.tsx
```

### Production Build

```bash
# Compile to standalone binary
bun build app.tsx --compile --outfile app

# Run compiled binary
./app
```

### Package for Distribution

```json
{
  "name": "my-kryon-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "bun --watch run src/index.tsx",
    "build": "bun build src/index.tsx --compile --outfile dist/app",
    "build:web": "KRYON_RENDERER=web bun run src/index.tsx"
  },
  "dependencies": {
    "kryon": "^0.2.0"
  }
}
```

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "kryon",
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## Advanced Patterns

### Custom Components

```tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

function CustomButton({ label, variant = 'primary', onClick }: ButtonProps) {
  const colors = {
    primary: '#3498db',
    secondary: '#95a5a6',
    danger: '#e74c3c',
  };

  return (
    <button
      title={label}
      backgroundColor={colors[variant]}
      color="white"
      width={150}
      height={45}
      borderRadius={8}
      onClick={onClick}
    />
  );
}

// Usage
<CustomButton label="Save" variant="primary" onClick={handleSave} />
```

### Conditional Rendering

```tsx
function ConditionalUI({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <column gap={20}>
      {isLoggedIn ? (
        <text content="Welcome back!" />
      ) : (
        <button title="Login" />
      )}
    </column>
  );
}
```

### Lists and Mapping

```tsx
const items = ['Apple', 'Banana', 'Cherry'];

function List() {
  return (
    <column gap={10}>
      {items.map((item, index) => (
        <text key={index} content={item} />
      ))}
    </column>
  );
}
```

## Deployment

### Desktop App

```bash
# Build standalone executable
bun build app.tsx --compile --outfile myapp

# Distribute
# - Linux: myapp (includes libkryon_desktop.so)
# - macOS: myapp.app bundle
# - Windows: myapp.exe + DLLs
```

### Web App

```bash
# Transpile to HTML/CSS/JS
KRYON_RENDERER=web bun run app.tsx

# Deploy to hosting
# - Upload generated HTML/CSS/JS files
# - Serve via Netlify, Vercel, GitHub Pages, etc.
```

## Performance Tips

1. **Minimize re-renders** - Use local state when possible
2. **Lazy load assets** - Load images on demand
3. **Virtualize long lists** - Render only visible items
4. **Debounce input handlers** - Avoid excessive updates
5. **Profile with Bun** - `bun --profile run app.tsx`

## Troubleshooting

### Library not found error

```bash
# Set library path
export LD_LIBRARY_PATH=/path/to/kryon/build:$LD_LIBRARY_PATH
bun run app.tsx
```

### JSX not recognized

Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "kryon"
  }
}
```

### Hot reload not working

```bash
# Use --watch flag
bun --watch run app.tsx
```

## Environment Variables

- `KRYON_RENDERER` - Renderer/codegen (sdl3, terminal, web)
- `KRYON_LIB_PATH` - Path to Kryon libraries
- `DEBUG` - Enable debug logging
- `KRYON_WEB_INLINE_CSS` - Inline CSS in HTML output

## Next Steps

- See [Components](./components.md) for full component reference
- See [Codegens](./codegens.md) for web transpilation details
- See [Examples](../examples/typescript/) for more examples
