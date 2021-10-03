const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // 60%
      base: "#292C28", // Blackish
      "txt-base": "#FFFFFF", // White
      primary: "#E1B114", // Yellow
      "txt-primary": "#363107", // Blackish

      // 30%
      secondary: "#7D8CA3", // Gray
      "txt-secondary": "#FFFFFF", // White
      "base-contrast": "#47505F",
      "txt-base-contrast": "#FFFFFF",

      // 10%
      "accent-primary": "#79A9D1", // Blue
      "txt-accent-primary": "#FFFFFF", // White
      alert: colors.red[500],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
