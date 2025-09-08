/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        petal1: "#f9a8d4",
        petal2: "#f472b6",
        petal3: "#ec4899",
      },
    },
  },
  plugins: [],
};
