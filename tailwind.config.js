/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mau-primary': '#d4724a',
        'mau-secondary': '#c0633f',
        'mau-accent': '#e8845e',
        'mau-light': '#e6f3ff',
        'mau-dark': '#003366',
        'mau-gold': '#ffd700',
        'mau-gray': '#f8f9fa',
      }
    },
  },
  plugins: [],
};
