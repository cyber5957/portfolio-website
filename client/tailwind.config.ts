import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './data/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      colors: {
        cyber: {
          bg: '#050816',
          blue: '#1E90FF',
          navy: '#07111f'
        }
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(30, 144, 255, 0.18), 0 0 18px rgba(30, 144, 255, 0.08)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(30, 144, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 144, 255, 0.08) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};

export default config;
