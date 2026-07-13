/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'verde-bosque': '#234334',
        pergamino: '#F8F4EC',
        terracota: '#A65D42',
        ambar: '#C89A3C'
      }
    },
  },
  plugins: [],
}

