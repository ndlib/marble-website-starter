export const theme = {
  space: [0, 4, 8, 16, 32],
  breakpoints: ['780px', '1024px', '1600px'],
  flexDirection: ['column', 'row', 'column-reverse'],
  textAlign: ['left', 'center', 'right'],
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
    bold: `
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
    heading: `
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
    logo: `
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
    menu: `
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
    gray: ['#efefef', '#dedede', '#666', '#333', '#111'],
    background: '#fff',
    primary: ['#ae914266', '#ae9142'],
    primaryText: ['#fff', 'rgba(255, 255, 255, 0.5)'],
    secondary: '#302205',
    attention: '#aa272f',
    highlight: '#d39f10',
    highlightWithOpacity: '#d39f1052',
  },
  styles: {
    Layout: {
      color: 'gray.4',
      fontFamily: 'body',
      fontSize: 0,
      lineHeight: 'body',
      overflowX: 'hidden',
    },
    Header: {
      backgroundColor: 'primary',
      color: 'background',
      fontFamliy: 'menu',
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
      width: '100%',
    },
    Footer: {
      backgroundColor: 'secondary',
      bottom: 0,
      color: 'background',
      left: 0,
      minHeight: '64px',
      overflow: 'hidden',
      position: 'static',
      a: {
        color: 'background',
        textDecoration: 'none',
      },
      img: {
        margin: '40px',
      },
    },
    a: {
      color: 'primary',
      wordBreak: 'break-word',
    },
    h1: {
      color: 'gray.4',
      fontFamily: 'heading',
      fontSize: 5,
      fontWeight: '600',
      lineHeight: 'heading',
      margin: '1rem 0 0',
    },
    h2: {
      fontFamily: 'heading',
      fontSize: 4,
      fontWeight: '600',
      lineHeight: 'heading',
    },
    h3: {
      fontFamily: 'body',
      fontSize: 2,
      fontWeight: '600',
      lineHeight: 'heading',
      margin: '.5rem 0',
    },

  },
}
export default theme
