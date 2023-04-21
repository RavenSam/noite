/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--hope-colors-primary)",
        primaryC: "var(--hope-colors-primaryC)",
        gray1: "var(--hope-colors-gray1)",
      }
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}

