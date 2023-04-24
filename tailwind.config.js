/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
      boxShadow: {
        1: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        5: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
        6: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        8: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        11:"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        19:"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        27:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        33: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        56: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        85: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
      },
      colors: {
        primary: "var(--hope-colors-primary)",
        primaryC: "var(--hope-colors-primaryC)",
        gray1: "var(--hope-colors-gray1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
