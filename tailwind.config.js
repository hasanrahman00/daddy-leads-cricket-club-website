/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Locked to the jersey — front-and-back combined preview
        cream: { 50: '#FBF1E5', 100: '#F2E5D0', 200: '#E8D8B8', 300: '#D4C195' },
        ink:   { 950: '#1A1A1A', 900: '#222222', 800: '#2A2A2A', 700: '#3A3A3A' },
        ember: { 500: '#C8553D' },
        gold:  { 500: '#C9A24A' },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif:   ['"Playfair Display"', 'serif'],
        sans:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
