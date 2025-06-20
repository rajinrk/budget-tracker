/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#FFC4C4',
            secondary: '#FF6F61',
           
        },
    },
  },
  plugins: [],
} 