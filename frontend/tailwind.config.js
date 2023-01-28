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
        'custom': 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;',
        
      }
    },
  },
  plugins: [],
}
