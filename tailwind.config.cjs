module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        taupe: 'rgb(var(--color-taupe-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        ink: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        'accent-light': 'rgb(var(--color-accent-light-rgb) / <alpha-value>)',
        'muted-lilac': 'rgb(var(--color-muted-lilac-rgb) / <alpha-value>)',
        muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
      },
      boxShadow: {
        soft: '0 18px 32px rgba(10, 7, 7, 0.12)',
        softLight: '0 12px 24px rgba(10, 7, 7, 0.08)',
      },
      letterSpacing: {
        headline: '0.08em',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
