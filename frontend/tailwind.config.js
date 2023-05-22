/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    "./node_modules/flowbite-react/**/*.js",
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase, config }) => {
      addBase({
        '.scrollbar':{
          overflowY: 'auto',
          scrollbarColor: '#FFFFFF #6666FF',
          scrollbarWidth: 'auto',
        },
        '.scrollbar::-webkit-scrollbar': {
          width: '10px',
          height: '6px',
        },
        '.scrollbar::-webkit-scrollbar-track': {
          background: '#FFFFFF',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
          background: '#6666FF',
          borderRadius: '2px',
          borderColor: '#FFFFFF',
          borderWidth: '2px',
        },
      })
    }),
    require('flowbite/plugin'),
  ],
}
