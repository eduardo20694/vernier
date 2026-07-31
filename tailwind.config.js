/** @type {import('tailwindcss').Config} */
import tokens from './src/tokens.json' with { type: 'json' }

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: tokens.colors.ink,
        panel: tokens.colors.panel,
        panel2: tokens.colors.panel2,
        line: tokens.colors.line,
        brass: tokens.colors.brass,
        verdigris: tokens.colors.verdigris,
        rust: tokens.colors.rust,
        vellum: tokens.colors.vellum,
      },
      fontFamily: tokens.fontFamily,
      fontSize: tokens.fontSize,
      borderRadius: tokens.borderRadius,
      boxShadow: {
        plate: '0 1px 0 rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.35)',
        brass: '0 0 0 1px rgba(201,166,107,0.25), 0 0 24px -4px rgba(201,166,107,0.5)',
        forged: 'inset 0 1px 0 rgba(201,166,107,0.18), 0 1px 0 rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'brass-metal':
          'linear-gradient(180deg, #E0C08A 0%, #C9A66B 48%, #8A7047 100%)',
        'panel-recess':
          'linear-gradient(180deg, #1B1815 0%, #24211D 55%, #2C2822 100%)',
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
