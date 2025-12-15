/**
 * Type declarations for @kryon/react
 * Provides React-like JSX components for Kryon UI framework
 */

declare module '@kryon/react' {
  // JSX namespace for custom elements
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

  // Style properties shared by most components
  interface StyleProps {
    width?: number | string;
    height?: number | string;
    background?: string;
    backgroundColor?: string;
    color?: string;
    padding?: number | string;
    margin?: number | string;
    marginTop?: number | string;
    marginBottom?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    border?: string;
    borderTop?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderRight?: string;
    borderRadius?: number | string;
    gap?: number | string;
    fontSize?: number;
    fontWeight?: string | number;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | string;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | string;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number | string;
    overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
    opacity?: number;
    zIndex?: number;
  }

  // Layout container props
  interface ContainerProps extends StyleProps {
    children?: React.ReactNode;
  }

  interface RowProps extends StyleProps {
    children?: React.ReactNode;
  }

  interface ColumnProps extends StyleProps {
    children?: React.ReactNode;
  }

  // Text component props
  interface TextProps extends StyleProps {
    text: string;
  }

  // Button component props
  interface ButtonProps extends StyleProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
  }

  // Input component props
  interface InputProps extends StyleProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    type?: 'text' | 'password' | 'number' | 'email';
  }

  // Checkbox component props
  interface CheckboxProps extends StyleProps {
    checked?: boolean;
    label?: string;
    onChange?: (checked: boolean) => void;
  }

  // Link component props
  interface LinkProps extends StyleProps {
    href: string;
    text: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
  }

  // Markdown component props
  interface MarkdownProps extends StyleProps {
    source?: string;           // Inline markdown content
    file?: string;             // Path to markdown file (relative to project root)
    theme?: 'light' | 'dark';
  }

  // Component declarations
  export function Container(props: ContainerProps): JSX.Element;
  export function Row(props: RowProps): JSX.Element;
  export function Column(props: ColumnProps): JSX.Element;
  export function Text(props: TextProps): JSX.Element;
  export function Button(props: ButtonProps): JSX.Element;
  export function Input(props: InputProps): JSX.Element;
  export function Checkbox(props: CheckboxProps): JSX.Element;
  export function Link(props: LinkProps): JSX.Element;
  export function Markdown(props: MarkdownProps): JSX.Element;

  // Hooks
  export function useState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T>(initialValue: T): { current: T };

  // App configuration
  interface KryonAppConfig {
    width?: number;
    height?: number;
    title?: string;
    background?: string;
    render: () => JSX.Element;
  }

  export function kryonApp(config: KryonAppConfig): any;
}

// JSX runtime for React-like JSX transformation
declare module '@kryon/jsx-runtime' {
  export function jsx(type: any, props: any, key?: string): any;
  export function jsxs(type: any, props: any, key?: string): any;
  export const Fragment: unique symbol;
}
