/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'ssm': '686px',
      'sm': '860px',
      'md': '920px',
      // => @media (min-width: 640px) { ... }

      'lg': '1200px',
      // => @media (min-width: 1024px) { ... }

      'lgg': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
