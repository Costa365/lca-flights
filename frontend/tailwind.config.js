/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Consolas', 'Monaco', 'monospace'],
      },
      colors: {
        'airport-yellow': '#FFDD00',
        'airport-blue': '#1a2a5e',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};