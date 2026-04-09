/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#121212',
        panel: '#191919',
        cyan: '#22d3ee'
      },
      boxShadow: {
        glow: '0 0 30px rgba(34, 211, 238, 0.25)'
      }
    }
  },
  plugins: []
};
