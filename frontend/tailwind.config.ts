import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        /* Forest Green Palette */
        forest: {
          900: '#0d2f27',
          800: '#173b33',
          700: '#284b43',
          600: '#3d665c',
          500: '#4a7a6f',
          400: '#6e8c82',
          300: '#9ab5ab',
          200: '#dce8d4',
          100: '#e8f2e8',
          50: '#f2f7f2',
        },
        /* Gold Palette */
        gold: {
          900: '#8a5e2a',
          700: '#b8823e',
          500: '#e8a553',
          300: '#f0c990',
          100: '#fcf0e0',
          50: '#fef9f4',
        },
        /* Gray Palette */
        gray: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#4a4a4a',
          600: '#6e6e6e',
          500: '#9a9a9a',
          400: '#b8b8b8',
          300: '#d4d4d4',
          200: '#e8e8e8',
          100: '#f5f5f5',
          50: '#fafafa',
        },
        /* Semantic Colors */
        success: {
          500: '#10b981',
          100: '#d1fae5',
        },
        warning: {
          500: '#f59e0b',
          100: '#fef3c7',
        },
        error: {
          500: '#ef4444',
          100: '#fee2e2',
        },
        info: {
          500: '#3b82f6',
          100: '#dbeafe',
        },
        /* Backgrounds */
        surface: {
          primary: '#fffefa',
          secondary: '#f8f7f2',
          tertiary: '#f2f7f2',
          elevated: '#ffffff',
        },
        /* Text */
        text: {
          primary: '#173b33',
          secondary: '#4a4a4a',
          tertiary: '#6e6e6e',
          disabled: '#9a9a9a',
          inverse: '#ffffff',
          link: '#284b43',
        },
        /* Borders */
        border: {
          default: '#e4e6de',
          strong: '#d4d4d4',
          subtle: '#f0f0f0',
          focus: '#0d2f27',
          error: '#ef4444',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        /* Display Scale */
        'display-hero': ['64px', { lineHeight: '1.1', letterSpacing: '-2.5px' }],
        'display-xl': ['56px', { lineHeight: '1.15', letterSpacing: '-2px' }],
        'display-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-1.5px' }],
        'display-md': ['40px', { lineHeight: '1.25', letterSpacing: '-1px' }],
        'display-sm': ['32px', { lineHeight: '1.3', letterSpacing: '-0.5px' }],
        /* Heading Scale */
        'heading-xl': ['28px', { lineHeight: '1.35', letterSpacing: '-0.5px' }],
        'heading-lg': ['24px', { lineHeight: '1.4', letterSpacing: '-0.25px' }],
        'heading-md': ['20px', { lineHeight: '1.45' }],
        'heading-sm': ['18px', { lineHeight: '1.5' }],
        'heading-xs': ['16px', { lineHeight: '1.5' }],
        /* Body Scale */
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.6' }],
        'body-xs': ['12px', { lineHeight: '1.5', letterSpacing: '0.25px' }],
        /* UI Scale */
        'ui-lg': ['16px', { lineHeight: '1.5' }],
        'ui-md': ['14px', { lineHeight: '1.5' }],
        'ui-sm': ['12px', { lineHeight: '1.5', letterSpacing: '0.25px' }],
        'ui-xs': ['11px', { lineHeight: '1.4', letterSpacing: '0.5px' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        '1': '0 1px 3px rgba(13, 47, 39, 0.12)',
        '2': '0 4px 6px rgba(13, 47, 39, 0.10)',
        '3': '0 10px 15px rgba(13, 47, 39, 0.10)',
        '4': '0 20px 25px rgba(13, 47, 39, 0.15)',
        '5': '0 25px 50px rgba(13, 47, 39, 0.25)',
        'soft': '0 4px 6px rgba(13, 47, 39, 0.05)',
        'medium': '0 10px 15px rgba(13, 47, 39, 0.10)',
        'float': '0 15px 45px rgba(25, 58, 49, 0.10)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'fade-out': 'fadeOut 200ms ease-in',
        'slide-in': 'slideIn 300ms ease-out',
        'slide-out': 'slideOut 200ms ease-in',
        'scale-in': 'scaleIn 300ms ease-out',
        'scale-out': 'scaleOut 200ms ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
