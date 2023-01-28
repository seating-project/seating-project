/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'blue': '#3ccdff',
      'dark-blue': '#0f172a',
      'black': '#000000',
      'white': '#ffffff',
      'gray': '#f5f5f5',
      'dark-gray': '#e5e5e5',
      'screen': '#c5c6d0',
      'yellow': "#ffff66"
    },
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      boxShadow: {
        'blue': '0 0 0 3px rgba(60, 205, 255, 0.45)',
      },
      backgroundImage: {
        'background': "url('/background.svg')",
      },
    },
  },
  plugins: [],
}
