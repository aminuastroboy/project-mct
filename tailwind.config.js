module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        plum: "#352a4b",
        petal: "#fde8ef",
        petal2: "#f9e5f0",
        blush: "#f4a6c6",
        mint: "#7dd3a6"
      },
      boxShadow: {
        soft: "0 6px 20px rgba(53,42,75,0.08)"
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: [],
};