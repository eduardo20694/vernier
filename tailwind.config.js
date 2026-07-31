/** @type {import('tailwindcss').Config} */
import tokens from './src/tokens.json' with { type: 'json' }

/** RGB channel tokens → `rgb(var(--x) / <alpha-value>)` so themes flip via CSS vars. */
const channel = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: channel('ink'),
        panel: channel('panel'),
        panel2: channel('panel2'),
        line: channel('line'),
        brass: {
          DEFAULT: channel('brass'),
          dim: channel('brass-dim'),
          bright: channel('brass-bright'),
        },
        verdigris: {
          DEFAULT: channel('verdigris'),
          dim: channel('verdigris-dim'),
        },
        rust: {
          DEFAULT: channel('rust'),
          dim: channel('rust-dim'),
        },
        vellum: {
          DEFAULT: channel('vellum'),
          muted: channel('vellum-muted'),
          faint: channel('vellum-faint'),
        },
      },
      fontFamily: tokens.fontFamily,
      fontSize: tokens.fontSize,
      borderRadius: tokens.borderRadius,
      boxShadow: {
        plate: 'var(--shadow-plate)',
        brass: 'var(--shadow-brass)',
        forged: 'var(--shadow-forged)',
      },
      backgroundImage: {
        'brass-metal': 'var(--gradient-brass-metal)',
        'panel-recess': 'var(--gradient-panel-recess)',
      },
      letterSpacing: {
        display: '-0.035em',
        tightest: '-0.03em',
      },
      maxWidth: {
        prose: '42rem',
        measure: '65ch',
      },
      keyframes: {
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        sheen: 'sheen 1.1s ease-in-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
