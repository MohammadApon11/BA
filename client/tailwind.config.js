/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xxs: "0px",
        xs: "300px",
        mobile: "500px",
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite")],
};
