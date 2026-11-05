/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial solicitada:
        garden: {
          darkPurple: '#3A1C36', // DARK PURPLE
          amethyst: '#9B71B2',   // AMETHYST
          thistle: '#E3D0EA',    // THISTLE
          olive: '#6C6D11',      // OLIVE
          calPoly: '#374126',    // CAL POLY GREEN
          
          // Tonos derivados para fondos suaves y legibilidad
          cream: '#FAF6FB',      // Fondo suave con toque thistle
          tint: '#F4ECF6',       // Fondo alterno
          darkBg: '#1E0E1B',     // Fondo nocturno derivado de Dark Purple
          darkCard: '#2B1428',   // Tarjetas nocturnas
          darkBorder: '#4E2648', // Bordes nocturnos
        },
        botanical: {
          50: '#f7faf5',
          100: '#edf4e9',
          200: '#d9e7d2',
          300: '#bbd5b1',
          400: '#95be87',
          500: '#6C6D11', // OLIVE
          600: '#54560d',
          700: '#374126', // CAL POLY GREEN
          800: '#2b341e',
          900: '#202717',
          950: '#13180e',
        },
        flora: {
          purple: '#3A1C36',
          amethyst: '#9B71B2',
          thistle: '#E3D0EA',
          olive: '#6C6D11',
          green: '#374126',
        }
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive', 'Georgia'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'Cambria', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(58, 28, 54, 0.08)',
        'lifted': '0 10px 30px -4px rgba(58, 28, 54, 0.14)',
        'glow-amethyst': '0 0 25px rgba(155, 113, 178, 0.3)',
      }
    },
  },
  plugins: [],
};
