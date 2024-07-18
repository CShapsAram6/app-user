/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        main: "#79a206",
        title: "#296253",
        error: "#cc0000",
        backgroup: "#f6f7fb",
        secondColor: "#51544f",
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
