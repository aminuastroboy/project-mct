/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0D0D0F',
        surface: '#141217',
        primary: '#6C63FF',
        secondary: '#FF4D6D',
        accent: '#00E5FF',
        text: {
          DEFAULT: '#CCCCCC',
          heading: '#FFFFFF'
        }
      },
      boxShadow: {
        glow: '0 8px 30px rgba(108,99,255,0.12)',
        neon: '0 0 30px rgba(108,99,255,0.18)'
      }
    }
  },
  plugins: [],
}
