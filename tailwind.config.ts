import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: { main: ['var(--font-main)', 'Be Vietnam Pro', 'sans-serif'] },
      colors: {
        brand:  { DEFAULT: '#0057FF', dark: '#003DC2', light: '#EEF3FF', muted: '#6B8CFF' },
        accent: { DEFAULT: '#FF6B00', light: '#FFF0E6' },
        surface: '#FFFFFF',
        border:  '#E4E8EF',
        muted:   '#6B7280',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(0,87,255,0.12)',
        brand: '0 4px 14px rgba(0,87,255,0.35)',
      },
    },
  },
  plugins: [],
};
export default config;
