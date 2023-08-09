/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");


module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      primary: "#1755f6",
      secondary: "#444452",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "780px",
      },
    },
    extend: {
      fontFamily: {
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        mono: ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
