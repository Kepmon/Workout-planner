/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue, js}'],
  plugins: [
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
    require('@gradin/tailwindcss-scrollbar')({
      size: '10px',
      track: {
        background: 'white',
        borderRadius: '40px'
      },
      thumb: {
        background: '#888',
        borderRadius: '40px'
      },
      hover: {
        background: '#888',
        borderRadius: '40px'
      }
    })
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'light-yellow': '#F7C873',
        'regular-yellow': '#F7B640',
        'dark-yellow': '#DF8931',
        'brown-color': '#C96211',
        'white-color': '#E5E6E3',
        'black-color': '#050300',
        'bg-shadow-color': 'rgba(0, 0, 0, .75)',
        'placeholder-color': '#515151',
        'input-color': '#D9D9D9',
        'toast-info': '#7DA532',
        'toast-error': '#C2554E',
        'footer-color': '#0E0014',
        'button-hover': '#970000'
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
        '3xl': '1px 1px 5px rgba(0, 0, 0, .2)'
      },
      fontSize: {
        40: '40px'
      },
      content: {
        checked: 'url("/img/checked-svgrepo-com.svg")'
      }
    }
  }
}
