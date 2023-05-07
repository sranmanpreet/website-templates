/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    screens: {
      sm: '350px',
      md: '480px',
      lg: '768px',
      xl: '1024px'
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      order: {
        '10': '10',
        '20': '20',
        '30': '30'
      },
      fontSize: {
        'smSiteTitle': ['2rem', {
          lineHeight: '2.5rem',
          letterSpacing: '0.06rem',
          fontWeight: '600'
        }],
        'smSiteSubTitle': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '0.3rem',
          fontWeight: '300',
        }],
        'mdSiteTitle': ['6rem', {
          lineHeight: '7rem',
          letterSpacing: '0.03rem',
          fontWeight: '600',
        }],
        'mdSiteSubTitle': ['1.8rem', {
          lineHeight: '3rem',
          letterSpacing: '0.3rem',
          fontWeight: '300',
        }],
        'postListTitle': ['1.5rem', {
          lineHeight: '2.5rem',
          letterSpacing: '0.5rem',
          fontWeight: '300',
        }],
        'lgPostListTitle': ['1.5rem', {
          lineHeight: '2.5rem',
          letterSpacing: '0.5rem',
          fontWeight: '300',
        }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}

