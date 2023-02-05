/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue, js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'light-yellow': '#F7C873',
        'regular-yellow': '#F7B640',
        'dark-yellow': '#DF8931',
        'dark-brown': '#C96211',
        'white-color': '#E5E6E3',
        'black-color': '#050300',
        'bg-shadow-color': 'rgba(0, 0, 0, .75)',
        'placeholder-color': '#515151',
        'input-color': '#D9D9D9',
        'footer-color': '#0E0014'
      },
      maxWidth: {
        1200: '1200px'
      },
      width: {
        1200: '1200px'
      },
      height: {
        400: '400px'
      },
      boxShadow: {
        '3xl': '1px 1px 5px rgba(0, 0, 0, .2)',
      },
      fontSize: {
        40: '40px'
      }
    },
  },
  plugins: [],
}
