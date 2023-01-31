/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      bblue: "#3ccdff",
      "dark-blue": "#0f172a",
      black: "#000000",
      white: "#ffffff",
      gray: "#f5f5f5",
      "dark-gray": "#e5e5e5",
      screen: "#c5c6d0",
      yellow: "#ffff66",
      sky: "#0ea5e9",
      indigo: "#6610f2",
      transparent: "transparent",
      gradient1: "#51A5C4",
      gradient2: "#85D2D6",
      blue: colors.blue,
      red: colors.red,
      "gray-200": colors.gray[200],
      "gray-300": colors.gray[300],
      "blue-500": colors.blue[500],
      "blue-700": colors.blue[700],
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      boxShadow: {
        bblue: "0 0 0 3px rgba(60, 205, 255, 0.45)",
      },
      backgroundImage: {
        background: "url('/background.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
