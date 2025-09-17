/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mau-primary': '#D07348',
        'mau-secondary': '#B85A32',
        'mau-accent': '#E68B5C',
        'mau-light': '#e6f3ff',
        'mau-dark': '#003366',
        'mau-gold': '#ffd700',
        'mau-gray': '#f8f9fa',
      }
    },
  },
  plugins: [],
};
