/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",
     "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        main: "#016bb9",
        title: "#0b4875",
        error: "#cc0000",
        backgroup: "#f6f7fb",
        secondColor: "#51544f",
        star: "#eeb52d",
        bgPrimary: "#f8f8f8",
        color_validata: "#eb644c",
      },
    },
  },
  plugins: [require("tailgrids/plugin"),('flowbite/plugin')],
};
