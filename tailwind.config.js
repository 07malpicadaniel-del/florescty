/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          50: '#f2f8f4',
          100: '#e1efe6',
          200: '#c5e0d0',
          300: '#9cc9b1',
          400: '#6eaa8d',
          500: '#488c6e',
          600: '#347156',
          700: '#2a5a46',
          800: '#234839',
          900: '#1e3c30',
          950: '#0e2019',
        },
        earth: {
          50: '#fbf8f4',
          100: '#f6f0e6',
          200: '#ecdec9',
          300: '#dfc6a4',
          400: '#cfaa7e',
          500: '#ba905e',
          600: '#aa7c4f',
          700: '#8e6341',
          800: '#735038',
          900: '#5e4230',
        },
        flora: {
          amber: '#e69d45',
          rose: '#e07a5f',
          lavender: '#8d7b9d',
          dew: '#e8f4f1'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(14, 32, 25, 0.06)',
        'lifted': '0 10px 30px -4px rgba(14, 32, 25, 0.1)',
        'glow': '0 0 25px rgba(72, 140, 110, 0.25)',
      }
    },
  },
  plugins: [],
};
