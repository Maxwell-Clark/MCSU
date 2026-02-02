'use client';
import { createTheme, rem, MantineColorsTuple } from '@mantine/core';

// New Color Palette - Sage, Purple, Pale Sage
const sage: MantineColorsTuple = [
  '#f2f5f2',  // 0 - lightest
  '#e4ebe3',  // 1
  '#c8d6c6',  // 2
  '#a8bda5',  // 3
  '#89a485',  // 4
  '#698465',  // 5 - primary
  '#567354',  // 6 - primary hover
  '#435a42',  // 7
  '#304130',  // 8
  '#1d281d',  // 9 - darkest
];

const purple: MantineColorsTuple = [
  '#f5f3f8',  // 0 - lightest
  '#e8e3f0',  // 1
  '#d1c7e1',  // 2
  '#b5a6ce',  // 3
  '#9a86bb',  // 4
  '#674c8f',  // 5 - accent
  '#5a4280',  // 6 - accent hover
  '#4a3669',  // 7
  '#392a52',  // 8
  '#281e3b',  // 9 - darkest
];

const paleSage: MantineColorsTuple = [
  '#fafbfa',  // 0 - lightest
  '#f3f6f2',  // 1
  '#e8ede7',  // 2
  '#d2ddd0',  // 3 - secondary
  '#bfcbbd',  // 4 - secondary dark
  '#a8b8a6',  // 5
  '#8fa38c',  // 6
  '#738c70',  // 7
  '#566855',  // 8
  '#3a453a',  // 9 - darkest
];

const neutral: MantineColorsTuple = [
  '#fafafa',  // 0 - surface light
  '#f5f5f5',  // 1 - surface muted
  '#e8e8e8',  // 2 - border
  '#d4d4d4',  // 3 - border dark
  '#b3b3b3',  // 4 - text muted (dark mode) - improved contrast
  '#9a9a9a',  // 5 - text light - improved contrast
  '#525252',  // 6 - text muted
  '#404040',  // 7 - text primary
  '#262626',  // 8 - surface elevated (dark)
  '#171717',  // 9 - surface (dark)
];

export const theme = createTheme({
  primaryColor: 'sage',
  primaryShade: { light: 5, dark: 4 },

  colors: {
    sage,
    purple,
    paleSage,
    neutral,
    // Keep for backwards compatibility
    blue: sage,
  },

  shadows: {
    xs: '0 1px 2px rgba(64, 64, 64, 0.05)',
    sm: '0 1px 3px rgba(64, 64, 64, 0.06), 0 1px 2px rgba(64, 64, 64, 0.04)',
    md: '0 4px 6px rgba(64, 64, 64, 0.07), 0 2px 4px rgba(64, 64, 64, 0.06)',
    lg: '0 10px 15px rgba(64, 64, 64, 0.1), 0 4px 6px rgba(64, 64, 64, 0.05)',
    xl: '0 20px 25px rgba(64, 64, 64, 0.1), 0 10px 10px rgba(64, 64, 64, 0.04)',
  },

  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',

  headings: {
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: rem(48), lineHeight: '1.1', fontWeight: '900' },
      h2: { fontSize: rem(36), lineHeight: '1.2', fontWeight: '700' },
      h3: { fontSize: rem(28), lineHeight: '1.3', fontWeight: '700' },
      h4: { fontSize: rem(22), lineHeight: '1.4', fontWeight: '600' },
      h5: { fontSize: rem(18), lineHeight: '1.4', fontWeight: '600' },
      h6: { fontSize: rem(16), lineHeight: '1.4', fontWeight: '600' },
    },
  },

  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },

  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  other: {
    transitionDuration: '250ms',
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
          transition: 'all 250ms ease',
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'md',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'lg',
      },
    },
    Accordion: {
      styles: {
        control: {
          fontWeight: 600,
        },
      },
    },
    Title: {
      styles: {
        root: {
          color: 'var(--color-text)',
        },
      },
    },
    Text: {
      styles: {
        root: {
          color: 'var(--color-text)',
        },
      },
    },
  },
});
