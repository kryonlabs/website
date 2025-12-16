/**
 * Kryon Documentation Page
 * Built with Kryon TSX bindings
 */

import { kryonApp, Column, Row, Text, Link, Markdown } from '@kryon/react';

// Design System - Colors & Spacing
const colors = {
  bg: '#0D1117',
  sidebar: '#161B22',
  primaryText: '#E6EDF3',
  secondaryText: '#8B949E',
  accent: '#58A6FF',
  border: '#30363D',
  cardBg: '#161B22',
};

const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24,
  xl: 32, xxl: 48, xxxl: 60
};

// ============================================================================
// Components
// ============================================================================

function Header() {
  return (
    <Row
      width="100%"
      height={60}
      background={colors.cardBg}
      borderBottom={`1px solid ${colors.border}`}
      padding={`0 ${spacing.lg}px`}
      alignItems="center"
      justifyContent="space-between"
    >
      <Row gap={0} alignItems="center">
        <Text text="Kryon" fontSize={24} fontWeight="bold" color={colors.primaryText} />
        <Text text="Labs" fontSize={24} fontWeight="bold" color={colors.accent} />
      </Row>

      <Row gap={spacing.xl} alignItems="center">
        <Link href="/" text="Home" fontSize={14} color={colors.secondaryText} />
        <Link href="/docs" text="Docs" fontSize={14} color={colors.accent} />
        <Link href="https://github.com/kryonlabs" text="GitHub" fontSize={14} color={colors.secondaryText} target="_blank" />
      </Row>
    </Row>
  );
}

function Sidebar() {
  return (
    <Column
      width={240}
      minHeight="100vh"
      background={colors.sidebar}
      padding={spacing.lg}
      borderRight={`1px solid ${colors.border}`}
    >
      <Text text="Documentation" fontSize={18} fontWeight="bold" color={colors.primaryText} marginBottom={spacing.lg} />

      {/* Getting Started Section */}
      <Text text="Getting Started" fontSize={12} fontWeight="bold" color={colors.secondaryText} marginTop={spacing.md} marginBottom={spacing.sm} />
      <Link href="/docs" text="Introduction" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/architecture" text="Architecture" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/examples" text="Examples" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />

      {/* Language Bindings Section */}
      <Text text="Language Bindings" fontSize={12} fontWeight="bold" color={colors.secondaryText} marginTop={spacing.xl} marginBottom={spacing.sm} />
      <Link href="/docs/nim-bindings" text="Nim" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/rust-bindings" text="Rust" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/typescript" text="TypeScript" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/js-bindings" text="JavaScript" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/lua-bindings" text="Lua" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/c-frontend" text="C" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />

      {/* Advanced Section */}
      <Text text="Advanced" fontSize={12} fontWeight="bold" color={colors.secondaryText} marginTop={spacing.xl} marginBottom={spacing.sm} />
      <Link href="/docs/ir-pipeline" text="IR Pipeline" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/ir-formats" text="IR File Formats (.kir/.kirb)" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/plugins" text="Plugin System" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />
      <Link href="/docs/developer-guide" text="Developer Guide" fontSize={14} color={colors.secondaryText} marginBottom={spacing.xs} />

      {/* Resources Section */}
      <Text text="Resources" fontSize={12} fontWeight="bold" color={colors.secondaryText} marginTop={spacing.xl} marginBottom={spacing.sm} />
      <Link href="https://github.com/kryonlabs/kryon" text="GitHub" fontSize={14} color={colors.secondaryText} target="_blank" marginBottom={spacing.xs} />
    </Column>
  );
}

function DocsContent() {
  return (
    <Column flexGrow={1} padding={spacing.xxl} background={colors.bg}>
      <Column width="100%" maxWidth={800}>
        <Markdown file="docs/getting-started.md" theme="dark" />
      </Column>
    </Column>
  );
}

// ============================================================================
// Main Application
// ============================================================================

export default kryonApp({
  title: "Kryon Documentation",
  background: colors.bg,

  render: () => (
    <Column width="100%" minHeight="100vh">
      <Header />
      <Row width="100%" flexGrow={1}>
        <Sidebar />
        <DocsContent />
      </Row>
    </Column>
  )
});
