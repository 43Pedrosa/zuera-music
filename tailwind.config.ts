import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070808',
        panel: '#111313',
        neon: '#21f07d',
        muted: '#95a39d'
      },
      boxShadow: {
        neon: '0 0 30px rgba(33,240,125,.2)'
      }
    }
  },
  plugins: []
};

export default config;
