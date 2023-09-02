/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      primary: "#1755f6",
      secondary: "#444452",
      gray: {
        lighter: "#eeeeee",
        light: "#74747e",
        DEFAULT: "#444452",
        dark: "#161718",
      },
      black: "#000000",
      white: "#ffffff",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "752px",
      },
    },
    extend: {
      fontFamily: {
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        mono: ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")
  ],
};
