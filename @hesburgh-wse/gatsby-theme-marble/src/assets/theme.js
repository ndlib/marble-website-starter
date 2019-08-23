// const breakpoints = ['800px', '1024px', '1600px']
export const theme = {
  space: [0, 4, 8, 16, 32],
  fonts: {
    body: `
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      Fira Sans,
      Droid Sans,
      Helvetica Neue,
      sans-serif
    `,
  },
  fontSizes: [16, 18, 20, 22, 24, 32],
  lineHeights: {
    body: 1.45,
    heading: 1.1,
  },
  colors: {
    gray: ['#efefef', '#ddd', '#333', '#111'],
    background: '#fff',
    primary: '#ae9142',
    secondary: '#302205',
    highlight: '#d39f10',
  },
  // mediaQueries: {
  //   small: `@media screen and (max-width: ${breakpoints[0]})`,
  //   medium: `@media screen and (max-width: ${breakpoints[1]})`,
  //   large: `@media screen and (min-width: ${breakpoints[2]})`,
  // },
  styles: {
    Layout: {
      color: 'gray.3',
      fontFamily: 'body',
      fontSize: 0,
      lineHeight: 'body',
    },
    Header: {
      backgroundColor: 'primary',
      color: 'background',
      fontWeight: 'bold',
      margin: '0 auto',
      padding: 0,
      width: '100vw',
      a: {
        color: 'inherit',
      },
    },
    Main: {
      margin: '0 auto',
      width: '100$',
    },

    Footer: {
      backgroundColor: 'secondary',
      bottom: 0,
      color: 'background',
      left: 0,
      lineHeight: '1.5rem',
      minHeight: '64px',
      overflow: 'hidden',
      position: 'static',
      a: {
        color: 'background',
        textDecoration: 'none',
      },
    },
    h1: {
      color: 'gray.3',
      fontSize: 5,
      fontWeight: '500',
      lineHeight: 'heading',
      margin: '1rem 0 0',
    },
    h2: {
      fontSize: 4,
      fontWeight: '600',
      lineHeight: 'heading',
    },
    h3: {
      fontSize: 1,
      fontWeight: '600',
      lineHeight: 'heading',
    },

  },
}
export default theme
