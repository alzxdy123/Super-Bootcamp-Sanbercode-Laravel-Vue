/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-linear": "linear-gradient(to right, #b3ffab, #12fff7);",
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake", "pastel"],
  },
};
