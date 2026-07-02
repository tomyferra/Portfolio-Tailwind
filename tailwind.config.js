/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f5f3ee',
        ink: '#141414',
        rust: '#b5451b',
        dot: '#c9c4b8',
        line: '#d8d4ca',
      },
    },
  },
  plugins: [],
}