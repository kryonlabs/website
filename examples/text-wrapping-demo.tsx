/**
 * Text Wrapping Demo - Before & After Comparison
 *
 * Demonstrates the feature card text wrapping issue and its fix.
 *
 * Run with: kryon run examples/text-wrapping-demo.tsx
 */

import { kryonApp, Column, Row, Text, Container } from '@kryon/react';

const colors = {
  bg: '#0D1117',
  cardBg: '#161B22',
  border: '#30363D',
  primaryText: '#E6EDF3',
  secondaryText: '#8B949E',
};

interface CardProps {
  title: string;
  description: string;
}

// BROKEN: Card without max-width constraints
// Text grows horizontally, making card very wide
function BrokenCard({ title, description }: CardProps) {
  return (
    <Container
      background={colors.cardBg}
      border={`1px solid ${colors.border}`}
      borderRadius={10}
      padding={32}
    >
      <Text
        text={title}
        fontSize={24}
        fontWeight="bold"
        color={colors.primaryText}
        marginBottom={16}
      />
      <Text
        text={description}
        fontSize={16}
        color={colors.secondaryText}
      />
    </Container>
  );
}

// FIXED: Card with max-width constraints and text wrapping
// Card has max width, text wraps at word boundaries
function FixedCard({ title, description }: CardProps) {
  return (
    <Container
      background={colors.cardBg}
      border={`1px solid ${colors.border}`}
      borderRadius={10}
      padding={32}
      maxWidth={428}        // Constrain card width
      width="100%"          // Fill available space up to max
    >
      <Text
        text={title}
        fontSize={24}
        fontWeight="bold"
        color={colors.primaryText}
        marginBottom={16}
        maxTextWidth={364}  // Enable text wrapping (428 - 32*2 padding)
      />
      <Text
        text={description}
        fontSize={16}
        color={colors.secondaryText}
        maxTextWidth={364}  // Enable text wrapping
      />
    </Container>
  );
}

export default kryonApp({
  width: 1000,
  height: 900,
  title: "Text Wrapping Demo - Before & After",
  background: colors.bg,

  render: () => (
    <Column width="100%" padding={48} gap={48}>
      {/* Section 1: Broken cards */}
      <Text
        text="❌ BROKEN: No max-width constraints"
        fontSize={32}
        fontWeight="bold"
        color={colors.primaryText}
      />
      <Text
        text="Notice how the cards become very wide to fit the long text on a single line."
        fontSize={14}
        color={colors.secondaryText}
        marginBottom={20}
      />

      <Row gap={48}>
        <BrokenCard
          title="Multiple Backends"
          description="Target SDL3 desktop (Windows, macOS, Linux), terminal TUI, or static web (HTML+CSS). Same IR, different renderers - your app adapts to each platform natively."
        />
        <BrokenCard
          title="Compact IR Format"
          description="The .kir JSON format is human-readable for debugging. The .kirb binary format is optimized for production - smaller files, faster parsing, instant loading."
        />
      </Row>

      {/* Section 2: Fixed cards */}
      <Text
        text="✅ FIXED: With max-width and text wrapping"
        fontSize={32}
        fontWeight="bold"
        color={colors.primaryText}
        marginTop={48}
      />
      <Text
        text="Cards now have equal width and text wraps naturally at word boundaries."
        fontSize={14}
        color={colors.secondaryText}
        marginBottom={20}
      />

      <Row gap={48}>
        <FixedCard
          title="Multiple Backends"
          description="Target SDL3 desktop (Windows, macOS, Linux), terminal TUI, or static web (HTML+CSS). Same IR, different renderers - your app adapts to each platform natively."
        />
        <FixedCard
          title="Compact IR Format"
          description="The .kir JSON format is human-readable for debugging. The .kirb binary format is optimized for production - smaller files, faster parsing, instant loading."
        />
      </Row>

      {/* Summary */}
      <Container
        background={colors.cardBg}
        border={`1px solid ${colors.border}`}
        borderRadius={10}
        padding={32}
        marginTop={48}
      >
        <Text
          text="💡 Solution"
          fontSize={24}
          fontWeight="bold"
          color={colors.primaryText}
          marginBottom={16}
        />
        <Text
          text="1. Add maxWidth to Container (e.g., maxWidth={428})"
          fontSize={16}
          color={colors.secondaryText}
          marginBottom={8}
        />
        <Text
          text="2. Add maxTextWidth to Text components for wrapping"
          fontSize={16}
          color={colors.secondaryText}
          marginBottom={8}
        />
        <Text
          text="3. Calculate maxTextWidth = containerMaxWidth - (padding * 2)"
          fontSize={16}
          color={colors.secondaryText}
        />
      </Container>
    </Column>
  )
});
