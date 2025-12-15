/**
 * Kryon Website - Official Landing Page
 * Built with Kryon TSX bindings
 */

import { kryonApp, Column, Row, Text, Button, Link, Container, Image } from '@kryon/react';

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
      padding={`120px ${spacing.xxl}px`}
      alignItems="center"
    >
      <Column width="100%" maxWidth={1000} alignItems="center">
        <Text
          text="Build Once. Deploy Natively. Everywhere."
          fontSize={56}
          fontWeight="bold"
          color={colors.primaryText}
          marginBottom={spacing.lg}
        />
        <Text
          text="Kryon is a universal UI framework with an intermediate representation (IR) layer. Write once in .kry, Nim, or TSX - compile to native desktop, terminal, or web targets."
          fontSize={20}
          color={colors.secondaryText}
          marginBottom={spacing.xxxl}
        />
        <Row gap={spacing.lg} marginTop={spacing.lg}>
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
      padding={`${spacing.xxxl * 2}px ${spacing.xxl}px`}
      borderTop={`1px solid ${colors.border}`}
      marginBottom={spacing.xxxl}
      alignItems="center"
    >
      <Column width="100%" maxWidth={1200}>
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
            title="Multiple Backends"
            description="Target SDL3 desktop (Windows, macOS, Linux), terminal TUI, or static web (HTML+CSS). Same IR, different renderers - your app adapts to each platform natively."
          />
          <FeatureCard
            emoji="⚡"
            title="Compact IR Format"
            description="The .kir JSON format is human-readable for debugging. The .kirb binary format is optimized for production - smaller files, faster parsing, instant loading."
          />
        </Row>
        <Row gap={spacing.xxl} marginTop={spacing.xxl}>
          <FeatureCard
            emoji="🧩"
            title="Multiple Languages"
            description="Write UI in .kry (simple declarative), Nim DSL (type-safe reactive), or TSX (familiar React-like syntax). All compile to the same universal IR format."
          />
          <FeatureCard
            emoji="🚀"
            title="Plugin System"
            description="Extend Kryon with plugins for Markdown rendering, custom components, and more. Plugins integrate seamlessly with the IR layer and all backends."
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
      padding={`${spacing.xxxl * 2}px ${spacing.xxl}px`}
      background={colors.cardBg}
      borderTop={`1px solid ${colors.border}`}
      borderBottom={`1px solid ${colors.border}`}
      alignItems="center"
    >
      <Column width="100%" maxWidth={1200}>
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
            title="Write Source"
            description="Define your UI in .kry, Nim DSL, or TSX - whichever fits your workflow."
          />
          <Text text="→" fontSize={48} color={colors.secondaryText} />
          <WorkflowStep
            emoji="⚙️"
            stepNumber={2}
            title="Compile to IR"
            description="The kryon CLI compiles your source to .kir (JSON) or .kirb (binary) intermediate format."
          />
          <Text text="→" fontSize={48} color={colors.secondaryText} />
          <WorkflowStep
            emoji="📱"
            stepNumber={3}
            title="Render Anywhere"
            description="Target desktop (SDL3), terminal, or web. Same IR, native rendering on each platform."
          />
        </Row>
      </Column>
    </Column>
  );
}

interface SponsorCardProps {
  name: string;
  image: string;
  website: string;
  twitter?: string;
}

function SponsorCard({ name, image, website, twitter }: SponsorCardProps) {
  return (
    <Column
      background={colors.cardBg}
      border={`1px solid ${colors.border}`}
      borderRadius={10}
      padding={spacing.xl}
      alignItems="center"
      gap={spacing.md}
    >
      <Image
        src={image}
        width={80}
        height={80}
        borderRadius={40}
      />
      <Text
        text={name}
        fontSize={18}
        fontWeight="600"
        color={colors.primaryText}
      />
      <Row gap={spacing.lg}>
        <Link
          href={website}
          text="Website"
          fontSize={14}
          color={colors.accent}
          target="_blank"
        />
        {twitter && (
          <Link
            href={`https://x.com/${twitter.replace('@', '')}`}
            text={twitter}
            fontSize={14}
            color={colors.accent}
            target="_blank"
          />
        )}
      </Row>
    </Column>
  );
}

function Sponsors() {
  return (
    <Column
      width="100%"
      padding={`${spacing.xxxl * 2}px ${spacing.xxl}px`}
      alignItems="center"
    >
      <Column width="100%" maxWidth={1200} alignItems="center">
        <Text
          text="Sponsored By"
          fontSize={40}
          fontWeight="bold"
          color={colors.primaryText}
          marginBottom={spacing.xxxl}
        />
        <Row gap={spacing.xxl} justifyContent="center">
          <SponsorCard
            name="5bitcube"
            image="assets/sponsors/5bitcube.jpg"
            website="https://5bitcube.com/"
            twitter="@5bitcube"
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
      padding={`${spacing.xxxl}px ${spacing.xxl}px`}
      justifyContent="center"
    >
      <Row
        width="100%"
        maxWidth={1200}
        borderTop={`1px solid ${colors.border}`}
        paddingTop={spacing.xxxl}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          text="© 2025 Kryon Labs. All rights reserved."
          fontSize={14}
          color={colors.secondaryText}
        />
        <Row gap={spacing.lg}>
          <Link href="/docs" text="Documentation" fontSize={14} color={colors.secondaryText} />
          <Link href="https://github.com/kryonlabs/kryon/issues" text="Support" fontSize={14} color={colors.secondaryText} target="_blank" />
        </Row>
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
      <Sponsors />
      <Footer />
    </Column>
  )
});
