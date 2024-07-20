/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        main: "#016bb9",
        title: "#0b4875",
        error: "#cc0000",
        backgroup: "#f6f7fb",
        secondColor: "#51544f",
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
