// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        designer:['Designer','sans-serif']
      },
      fontWeight: {
        light: 300,
        regular: 400,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
};
