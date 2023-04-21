/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
            DEFAULT: {
               css: {
                  "--tw-prose-counters": "#374151",
                  "--tw-prose-bullets": "#374151",
                  "--tw-prose-quote-borders": "#374151",
                  "--tw-prose-invert-counters": "#d1d5db",
                  "--tw-prose-invert-bullets": "#d1d5db",
                  "--tw-prose-invert-quote-borders": "#d1d5db",
               },
            },
         }),
      
      colors: {
        primary: "var(--hope-colors-primary)",
        primaryC: "var(--hope-colors-primaryC)",
        gray1: "var(--hope-colors-gray1)",
      }
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}

