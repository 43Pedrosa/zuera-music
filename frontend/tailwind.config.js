/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        luxuryBlack: '#0A0A0A',
        ivory: '#F2EEE8',
        softGray: '#D6D6D6'
      }
    }
  },
  plugins: []
};
