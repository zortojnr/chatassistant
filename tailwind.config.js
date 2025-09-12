/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mau-primary': '#0066cc',
        'mau-secondary': '#004499',
        'mau-accent': '#0080ff',
        'mau-light': '#e6f3ff',
        'mau-dark': '#003366',
        'mau-gold': '#ffd700',
        'mau-gray': '#f8f9fa',
      }
    },
  },
  plugins: [],
};
