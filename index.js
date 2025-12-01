/**
 * Kryon Website - Official Landing Page
 * Built with Kryon JavaScript bindings
 */

import { run, c } from '../kryon/bindings/javascript/index.js';

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
  return c.container({
    width: '100%',
    height: 70,
    backgroundColor: colors.cardBg,
    borderBottom: `1px solid ${colors.border}`,
    padding: `0 ${spacing.lg}px`,
    layout: 'flex',
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, [
    // Logo
    c.row({ gap: 0, alignItems: 'center' }, [
      c.text({ content: 'Kryon', fontSize: 28, fontWeight: 'bold', color: colors.primaryText }),
      c.text({ content: 'Labs', fontSize: 28, fontWeight: 'bold', color: colors.accent })
    ]),
    // Navigation
    c.row({ gap: spacing.xl, alignItems: 'center' }, [
      c.text({ content: 'Features', fontSize: 16, color: colors.secondaryText }),
      c.text({ content: 'Docs', fontSize: 16, color: colors.secondaryText }),
      c.text({ content: 'GitHub', fontSize: 16, color: colors.secondaryText }),
      c.button({
        title: 'View Documentation',
        backgroundColor: colors.accent,
        color: colors.white,
        padding: '10px 20px',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: '600'
      })
    ])
  ]);
}

function Hero() {
  return c.container({
    width: '100%',
    padding: '120px 0',
    layout: 'flex',
    direction: 'column',
    alignItems: 'center',
    textAlignment: 'center',
    background: 'radial-gradient(circle, rgba(0, 168, 255, 0.05) 0%, rgba(13, 17, 23, 0) 70%)'
  }, [
    c.text({
      content: 'Build Once. Deploy Natively. Everywhere.',
      fontSize: 56,
      fontWeight: 'bold',
      color: colors.primaryText,
      textAlignment: 'center',
      maxWidth: 800,
      marginBottom: spacing.lg
    }),
    c.text({
      content: 'Kryon is a declarative UI framework that compiles your apps into an ultra-compact binary format for unparalleled performance on desktop, mobile, web, and embedded systems.',
      fontSize: 20,
      color: colors.secondaryText,
      textAlignment: 'center',
      maxWidth: 700,
      lineHeight: 1.6,
      marginBottom: spacing.xxl
    }),
    c.row({ gap: spacing.lg }, [
      c.button({
        title: 'Get Started',
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: colors.accent,
        color: colors.white,
        padding: '15px 35px',
        borderRadius: 8
      }),
      c.button({
        title: 'View on GitHub',
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: 'transparent',
        color: colors.primaryText,
        border: `1px solid ${colors.border}`,
        padding: '15px 35px',
        borderRadius: 8
      })
    ])
  ]);
}

function FeatureCard(emoji, title, description) {
  return c.container({
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    padding: spacing.xl
  }, [
    c.text({ content: emoji, fontSize: 40, marginBottom: spacing.lg }),
    c.text({
      content: title,
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primaryText,
      marginBottom: spacing.md
    }),
    c.text({
      content: description,
      fontSize: 16,
      color: colors.secondaryText,
      lineHeight: 1.6
    })
  ]);
}

function Features() {
  return c.container({
    width: '100%',
    padding: `${spacing.xxxl * 2}px 0`,
    borderTop: `1px solid ${colors.border}`
  }, [
    c.container({
      width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      padding: `0 ${spacing.lg}px`
    }, [
      c.text({
        content: 'Why Kryon?',
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.primaryText,
        textAlignment: 'center',
        marginBottom: spacing.xxxl
      }),
      c.container({
        layout: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: spacing.xxl
      }, [
        FeatureCard(
          '🌍',
          'True Universality',
          'Go beyond mobile and web. Kryon\'s compiled binary format runs natively on desktop (Win, macOS, Linux), mobile (iOS, Android), web (WASM), and even low-power embedded devices.'
        ),
        FeatureCard(
          '⚡',
          'Extreme Performance',
          'The KRB binary format achieves 65-75% size reduction over source. With optimized data structures and a lightweight runtime, your apps load instantly and run smoothly on any hardware.'
        ),
        FeatureCard(
          '🧩',
          'Declarative & Powerful',
          'Write clean, maintainable UI with the KRY language. Leverage a powerful component system, scoped variables, style inheritance, and pseudo-selectors to build complex interfaces with ease.'
        ),
        FeatureCard(
          '🚀',
          'Extensible with Scripts',
          'Add dynamic behavior and complex logic to your applications. Kryon\'s runtime seamlessly integrates with sandboxed script engines like Lua and JavaScript, providing a safe and powerful API.'
        )
      ])
    ])
  ]);
}

function WorkflowStep(emoji, stepNumber, title, description) {
  return c.column({
    flex: 1,
    alignItems: 'center',
    textAlignment: 'center'
  }, [
    c.container({
      width: 120,
      height: 120,
      backgroundColor: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: '50%',
      layout: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg
    }, [
      c.text({
        content: emoji,
        fontSize: 48,
        color: colors.accent
      })
    ]),
    c.text({
      content: `${stepNumber}. ${title}`,
      fontSize: 20,
      fontWeight: '600',
      color: colors.primaryText,
      marginBottom: spacing.sm
    }),
    c.text({
      content: description,
      fontSize: 14,
      color: colors.secondaryText,
      textAlignment: 'center'
    })
  ]);
}

function Workflow() {
  return c.container({
    width: '100%',
    padding: `${spacing.xxxl * 2}px 0`,
    backgroundColor: colors.cardBg,
    borderTop: `1px solid ${colors.border}`,
    borderBottom: `1px solid ${colors.border}`
  }, [
    c.container({
      width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      padding: `0 ${spacing.lg}px`
    }, [
      c.text({
        content: 'The Kryon Workflow',
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.primaryText,
        textAlignment: 'center',
        marginBottom: spacing.xxxl
      }),
      c.row({
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.lg
      }, [
        WorkflowStep('📝', 1, 'Write KRY', 'Define your UI in the simple, declarative KRY language.'),
        c.text({ content: '→', fontSize: 48, color: colors.secondaryText }),
        WorkflowStep('⚙️', 2, 'Compile to KRB', 'The `kryc` compiler optimizes, validates, and transforms your source into a compact binary.'),
        c.text({ content: '→', fontSize: 48, color: colors.secondaryText }),
        WorkflowStep('📱', 3, 'Run Natively', 'The cross-platform runtime loads the KRB file and renders a native, high-performance UI.')
      ])
    ])
  ]);
}

function Footer() {
  return c.container({
    width: '100%',
    padding: `${spacing.xxxl}px 0`,
    borderTop: `1px solid ${colors.border}`
  }, [
    c.container({
      width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      padding: `0 ${spacing.lg}px`,
      layout: 'flex',
      direction: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }, [
      c.text({
        content: '© 2025 Kryon Labs. All rights reserved.',
        fontSize: 14,
        color: colors.secondaryText
      }),
      c.row({ gap: spacing.lg }, [
        c.text({ content: 'Features', fontSize: 14, color: colors.secondaryText }),
        c.text({ content: 'Documentation', fontSize: 14, color: colors.secondaryText }),
        c.text({ content: 'Community', fontSize: 14, color: colors.secondaryText }),
        c.text({ content: 'Support', fontSize: 14, color: colors.secondaryText })
      ])
    ])
  ]);
}

// ============================================================================
// Main Application
// ============================================================================

const app = c.app({
  windowTitle: 'Kryon Labs - The Universal UI Compiler',
  windowWidth: 1400,
  windowHeight: 900,
  backgroundColor: colors.bg
}, [
  c.container({
    width: '100%',
    height: '100%',
    layout: 'flex',
    direction: 'column',
    overflow: 'auto'
  }, [
    Header(),
    Hero(),
    Features(),
    Workflow(),
    Footer()
  ])
]);

// Run the application (target determined by kryon.toml)
run(app, {
  target: 'web',
  outputDir: 'dist'
});
