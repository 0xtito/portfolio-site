// /** @type {import('tailwindcss').Config} */
module.exports = {
  variants: [],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-island": "#22a39f",
        "light-black": "#222222",
        "light-gray": "#d3d3d3",
        "off-white": "#f3efe0",
      },
    },
  },
  plugins: [require("daisyui")],
};
