export const theme = {
  space: [0, 4, 8, 16, 32],
  breakpoints: ['840px', '1024px', '1600px'],
  flexDirection: ['column', 'row', 'column-reverse'],
  textAlign: ['left', 'center', 'right'],
  fonts: {
    body: `
      -apple-system',
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif
    `,
    bold: `
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif
    `,
    heading: `
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif
    `,
    logo: `
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif
    `,
    menu: `
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
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
    primary: '#ae9142',
    primaryText: 'rgba(255, 255, 255, 0.5)',
    primaryLightText: '#fff',
    primaryWithOpacity: '#ae914266',
    secondary: '#302205',
    attention: '#aa272f',
    highlight: '#d39f10',
    highlightWithOpacity: '#d39f1052',
    callout: '#f3efe3',
  },
  cards: {
    primary: {
      '& h2': {
        color: 'gray.4',
        fontFamily: 'title',
      },
      '& figcaption div': {
        color: 'gray.4',
      },
    },
  },
  text: {
    default: {
      fontFamily: 'body',
      fontSize: 0,
      lineHeight: 'body',
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: '100',
      lineHeight: 'heading',
    },
  },
  styles: {
    root: {
      color: 'gray.4',
      variant: 'text.default',
    },
    Layout: {
      overflowX: 'hidden',
    },
    Header: {
      color: 'background',
      fontFamily: 'menu',
      fontWeight: '100',
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
      '& a': {
        color: 'primary',
      },
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
      fontSize: 5,
      variant: 'text.heading',
      margin: '1rem 0 0',
    },
    h2: {
      fontSize: 4,
      variant: 'text.heading',
    },
    h3: {
      fontSize: 2,
      variant: 'text.heading',
      margin: '.5rem 0',
    },

  },
}
export default theme
