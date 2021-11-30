module.exports = {
  mode: 'jit', // Just-In-Time Compiler
  purge: ['./src/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      borderWidth: {
        '3': '3px'
      },
      colors: {
        'green': '#00f1d7',
        'blue': '#00CCFA',
        'dark-surface': '#0A141D',
        'bodycopy': '#939EB4'
      },
      fontFamily: {
        montserrat: 'Montserrat, sans-serif'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
