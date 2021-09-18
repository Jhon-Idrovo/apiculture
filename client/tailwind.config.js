const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      base: "#363107",
      "txt-base": "#FFFFFF",
      primary: "#E1B114",
      "txt-primary": "#363107",
      secondary: "#7D8CA3",
      "txt-secondary": "#FFFFFF",
      "accent-primary": "#79A9D1",
      "txt-accent-primary": "#FFFFFF",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
