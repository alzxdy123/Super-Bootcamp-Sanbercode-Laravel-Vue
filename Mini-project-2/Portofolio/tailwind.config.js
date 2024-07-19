/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        gradient1: "linear-gradient(to right, #b3ffab, #12fff7)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      addUtilities({
        ".border-bottom-1": {
          "@apply border-b border-slate-400": {},
        },
        ".wrapper": {
          "@apply ml-5 lg:ml-10 my-10": {},
          "max-width": "700px",
        },
        ".break": {
          "@apply mb-10 pb-10": {},
        },
      });
    },
  ],
};
