module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true
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
        'dark-blue': '#162635',
        'dark-green': '#062326'
      },
      fontFamily: {
        montserrat: 'Montserrat, sans-serif'
      },
      spacing: {
        '6\.25': '1.5625rem', // 25px
        '7\.5': '1.875rem', // 30px
        '12\.5': '3.125rem',
        '13': '3.25rem',
        '15': '3.75rem', // 60px
        '22': '5.5rem', // 88px
        '25': '6.25rem', // 100px
        '30': '7.5rem',
        '38': '9.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      width: {
        '18': '4.5rem', // 72px
      },
      height: {
        '18': '4.5rem', // 72px
      }
    },
  },
  plugins: [],
}
