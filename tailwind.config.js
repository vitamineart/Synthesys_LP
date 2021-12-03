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
        'green': 'var(--color-green-accent)',
        'blue': 'var(--color-blue-accent)',
        'dark-surface': '#0A141D',
        'bodycopy': '#939EB4',
        'bodycopy-darker': '#616D86',
        'footer-border': '#162635'
      },
      fontFamily: {
        montserrat: 'Montserrat, sans-serif'
      },
      spacing: {
        '6\.25': '1.5625rem', // 30px
        '7\.5': '1.875rem', // 30px
        '12\.5': '3.125rem',
        '13': '3.25rem',
        '15': '3.75rem', // 60px
        '22': '5.5rem', // 60px
        '25': '6.25rem', // 100px
        '30': '7.5rem',
        '38': '9.5rem',
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
