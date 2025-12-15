/**
 * Kryon Website - Official Landing Page
 * Built with Kryon TSX bindings
 */

import { kryonApp, Column, Row, Text, Button, Link, Container } from '@kryon/react';

// Design System - Colors & Spacing
const colors = {
  bg: '#0D1117',
  primaryText: '#E6EDF3',
  secondaryText: '#8B949E',
  accent: '#00A8FF',
  accentHover: '#008fdb',
  border: '#30363D',
  cardBg: '#161B22',
  codeBg: '#010409',
  white: '#FFFFFF'
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
      height={70}
      background={colors.cardBg}
      borderBottom={`1px solid ${colors.border}`}
      padding={`0 ${spacing.lg}px`}
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Logo */}
      <Row gap={0} alignItems="center">
        <Text text="Kryon" fontSize={28} fontWeight="bold" color={colors.primaryText} />
        <Text text="Labs" fontSize={28} fontWeight="bold" color={colors.accent} />
      </Row>

      {/* Navigation */}
      <Row gap={spacing.xl} alignItems="center">
        <Link href="#features" text="Features" fontSize={16} color={colors.secondaryText} />
        <Link href="/docs" text="Documentation" fontSize={16} color={colors.secondaryText} />
        <Link href="https://github.com/kryonlabs" text="GitHub" fontSize={16} color={colors.secondaryText} target="_blank" />
      </Row>
    </Row>
  );
}

function Hero() {
  return (
    <Column
      width="100%"
      padding="120px 0"
      alignItems="center"
    >
      <Text
        text="Build Once. Deploy Natively. Everywhere."
        fontSize={56}
        fontWeight="bold"
        color={colors.primaryText}
        marginBottom={spacing.lg}
      />
      <Text
        text="Kryon is a declarative UI framework that compiles your apps into an ultra-compact binary format for unparalleled performance on desktop, mobile, web, and embedded systems."
        fontSize={20}
        color={colors.secondaryText}
        marginBottom={spacing.xxl}
      />
      <Row gap={spacing.lg}>
        <Link
          href="/docs"
          text="Get Started"
          fontSize={18}
          fontWeight="600"
          background={colors.accent}
          color={colors.white}
          padding="15px 35px"
          borderRadius={8}
        />
        <Link
          href="https://github.com/kryonlabs"
          text="View on GitHub"
          fontSize={18}
          fontWeight="600"
          background="transparent"
          color={colors.primaryText}
          border={`1px solid ${colors.border}`}
          padding="15px 35px"
          borderRadius={8}
          target="_blank"
        />
      </Row>
    </Column>
  );
}

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <Column
      background={colors.cardBg}
      border={`1px solid ${colors.border}`}
      borderRadius={10}
      padding={spacing.xl}
    >
      <Text text={emoji} fontSize={40} marginBottom={spacing.lg} />
      <Text
        text={title}
        fontSize={24}
        fontWeight="bold"
        color={colors.primaryText}
        marginBottom={spacing.md}
      />
      <Text
        text={description}
        fontSize={16}
        color={colors.secondaryText}
      />
    </Column>
  );
}

function Features() {
  return (
    <Column
      width="100%"
      padding={`${spacing.xxxl * 2}px 0`}
      borderTop={`1px solid ${colors.border}`}
    >
      <Column width="100%" padding={`0 ${spacing.lg}px`}>
        <Text
          text="Why Kryon?"
          fontSize={40}
          fontWeight="bold"
          color={colors.primaryText}
          marginBottom={spacing.xxxl}
        />
        <Row gap={spacing.xxl}>
          <FeatureCard
            emoji="🌍"
            title="True Universality"
            description="Go beyond mobile and web. Kryon's compiled binary format runs natively on desktop (Win, macOS, Linux), mobile (iOS, Android), web (WASM), and even low-power embedded devices."
          />
          <FeatureCard
            emoji="⚡"
            title="Extreme Performance"
            description="The KRB binary format achieves 65-75% size reduction over source. With optimized data structures and a lightweight runtime, your apps load instantly and run smoothly on any hardware."
          />
        </Row>
        <Row gap={spacing.xxl} marginTop={spacing.xxl}>
          <FeatureCard
            emoji="🧩"
            title="Declarative & Powerful"
            description="Write clean, maintainable UI with the KRY language. Leverage a powerful component system, scoped variables, style inheritance, and pseudo-selectors to build complex interfaces with ease."
          />
          <FeatureCard
            emoji="🚀"
            title="Extensible with Scripts"
            description="Add dynamic behavior and complex logic to your applications. Kryon's runtime seamlessly integrates with sandboxed script engines like Lua and JavaScript, providing a safe and powerful API."
          />
        </Row>
      </Column>
    </Column>
  );
}

interface WorkflowStepProps {
  emoji: string;
  stepNumber: number;
  title: string;
  description: string;
}

function WorkflowStep({ emoji, stepNumber, title, description }: WorkflowStepProps) {
  return (
    <Column alignItems="center">
      <Column
        width={120}
        height={120}
        background={colors.bg}
        border={`1px solid ${colors.border}`}
        borderRadius={60}
        alignItems="center"
        justifyContent="center"
        marginBottom={spacing.lg}
      >
        <Text text={emoji} fontSize={48} color={colors.accent} />
      </Column>
      <Text
        text={`${stepNumber}. ${title}`}
        fontSize={20}
        fontWeight="600"
        color={colors.primaryText}
        marginBottom={spacing.sm}
      />
      <Text
        text={description}
        fontSize={14}
        color={colors.secondaryText}
      />
    </Column>
  );
}

function Workflow() {
  return (
    <Column
      width="100%"
      padding={`${spacing.xxxl * 2}px 0`}
      background={colors.cardBg}
      borderTop={`1px solid ${colors.border}`}
      borderBottom={`1px solid ${colors.border}`}
    >
      <Column width="100%" padding={`0 ${spacing.lg}px`}>
        <Text
          text="The Kryon Workflow"
          fontSize={40}
          fontWeight="bold"
          color={colors.primaryText}
          marginBottom={spacing.xxxl}
        />
        <Row justifyContent="space-between" alignItems="center" gap={spacing.lg}>
          <WorkflowStep
            emoji="📝"
            stepNumber={1}
            title="Write KRY"
            description="Define your UI in the simple, declarative KRY language."
          />
          <Text text="→" fontSize={48} color={colors.secondaryText} />
          <WorkflowStep
            emoji="⚙️"
            stepNumber={2}
            title="Compile to KRB"
            description="The kryc compiler optimizes, validates, and transforms your source into a compact binary."
          />
          <Text text="→" fontSize={48} color={colors.secondaryText} />
          <WorkflowStep
            emoji="📱"
            stepNumber={3}
            title="Run Natively"
            description="The cross-platform runtime loads the KRB file and renders a native, high-performance UI."
          />
        </Row>
      </Column>
    </Column>
  );
}

function Footer() {
  return (
    <Row
      width="100%"
      padding={`${spacing.xxxl}px 0`}
      borderTop={`1px solid ${colors.border}`}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text
        text="© 2025 Kryon Labs. All rights reserved."
        fontSize={14}
        color={colors.secondaryText}
      />
      <Row gap={spacing.lg}>
        <Link href="#features" text="Features" fontSize={14} color={colors.secondaryText} />
        <Link href="/docs" text="Documentation" fontSize={14} color={colors.secondaryText} />
        <Link href="https://github.com/kryonlabs/kryon/discussions" text="Community" fontSize={14} color={colors.secondaryText} target="_blank" />
        <Link href="https://github.com/kryonlabs/kryon/issues" text="Support" fontSize={14} color={colors.secondaryText} target="_blank" />
      </Row>
    </Row>
  );
}

// ============================================================================
// Main Application
// ============================================================================

export default kryonApp({
  width: 1400,
  height: 900,
  title: "Kryon Labs - The Universal UI Compiler",
  background: colors.bg,

  render: () => (
    <Column width="100%" height="100%">
      <Header />
      <Hero />
      <Features />
      <Workflow />
      <Footer />
    </Column>
  )
});
