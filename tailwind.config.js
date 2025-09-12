/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mau-blue': '#1e3a8a',
        'mau-light-blue': '#3b82f6',
        'mau-dark-blue': '#1e40af',
        'mau-accent': '#f59e0b',
        'mau-gray': '#6b7280',
      }
    },
  },
  plugins: [],
};
