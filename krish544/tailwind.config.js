/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        scale: 'scale 1s linear infinite',
        smallspin: 'smallspin 1s linear infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        scale: {
          '0%, 100%': { transform: 'scale(100%)'},
          '50%': { transform: 'scale(90%)'}
        },
        smallspin: {
          '0%': {transform: 'scale(100%)'} ,
          '50%': {transform: 'scale(85%) rotate(180deg)'},
          '100%': {transform:'scale(100%) rotate(360deg)'}
        }
      }
    },
  },
  plugins: [],
}

