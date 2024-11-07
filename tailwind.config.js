const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#8582D9",
        yellow: "#F2C744",
        brown: "#F2CB9B",
        pink: "#F27272",
        dark: "#0D0D0D",
        gray: "#4a4e50",
        lightGray: "#9ca3af",
        green: "#75BF7A",
        orange: "#F2845C",
        red: "#F27272",
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
