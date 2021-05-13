/**
* Uses preset bootstrap as a basis
* https://github.com/system-ui/theme-ui/blob/develop/packages/preset-bootstrap/src/index.ts
*/

import merge from 'lodash.merge'
import bootstrapTheme from '@theme-ui/preset-bootstrap'

/*
space: [0, 4, 8, 16, 32],
breakpoints: ['840px', '1024px', '1600px'],
flexDirection: ['column', 'row', 'column-reverse'],
textAlign: ['left', 'center', 'right'],
fontSizes: [16, 18, 20, 22, 24, 32],
lineHeights: {
  body: 1.45,
  heading: 1.1,
},
*/

export const colors = {
  background: '#fff',
  primary: '#0c2340',
  primaryDark: '#081629',
  primaryLight: '#143865',
  primaryBright: '#1c4f8f',
  secondary: '#ae9142',
  secondaryDark: '#8c7535',
  secondaryLight: '#d39f10',
  light: '#e1e8f2',
  lightDark: '#c1cddd',
  lightLight: '#edf2f9',
}

const buttonShared = {
  fontSize: 3,
  px: '1.5rem',
  borderRadius: '.6em',
  bg: 'primary',
  '&:hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer',
  },
  '& a': {
    textDecoration: 'none',
  },
}

const theme = merge({}, bootstrapTheme, {
  colors: colors,
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
  cards: {
    primary: {
      '& h2': {
        color: 'primary',
        fontFamily: 'title',
        fontSize: '4',
      },
      '& figcaption div': {
        color: 'gray.9',
      },
    },
  },
  buttons: {
    primary: {
      ...buttonShared,
      color: 'white',
      bg: 'primary',
      '& a': {
        ...buttonShared['& a'],
        color: 'white',
      },
    },
    secondary: {
      ...buttonShared,
      bg: 'secondary',
      color: 'white',
      '& a': {
        ...buttonShared['& a'],
        color: 'white',
      },
    },
    light: {
      ...buttonShared,
      color: 'text',
      bg: 'light',
      '& a': {
        ...buttonShared['& a'],
        color: 'text',
      },
    },
    inverse: {
      ...buttonShared,
      color: 'text',
      bg: 'white',
      '& a': {
        ...buttonShared['& a'],
        color: 'white',
      },
    },
  },
  sections: {
    default: {
      bg: 'white',
      maxWidth: '65rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      '& div.sectionContent': {
        maxWidth: '65rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf: 'center',
        py: '2rem',
      },
      '& div.sectionImage': {
      },
    },
    fullBleed: {
      bg: 'white',
      marginLeft: 'auto',
      marginRight: 'auto',
      mx: '5vw',
      pt: '2rem',
      '& div.sectionImage': {
        m: '-2rem 0 -2rem 5vw',
      },
      '& div.sectionContent': {
        maxWidth: '65rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf: 'center',
        py: '2rem',
      },
    },
    fullBleedLight: {
      '::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '100%',
        width: '100vw',
        zIndex: -1,
        bg: 'inherit',
      },
      bg: 'light',
      marginLeft: 'auto',
      marginRight: 'auto',
      px: '5vw',
      '& div.sectionImage': {
        m: '-1rem 0 -1rem 0',
      },
      '& div.sectionContent': {
        maxWidth: '65rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf: 'center',
        py: '2rem',
        width: 'auto',
      },
    },
  },
  text: {
    default: {
      fontFamily: 'body',
      fontSize: 3,
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: '100',
      lineHeight: 'heading',
      color: 'primary',
    },
  },
  links: {
    header: {
      position: 'relative',
      display: 'flex',
      margin: '0 0 -2.7rem',
      justifyContent: 'flex-end',
      '& div': {
        display: 'flex',
        opacity: '1',
        transition: 'all 1s',
        my: '5px',
        background: 'white',
      },
      '& input': {
        width: '300px',
        py: '1.25rem',
      },
      '& a, button': {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '100%',
        padding: '1.25rem 1.375rem',
        opacity: '1',
        lineHeight: '1.2',
        textDecoration: 'none',
        color: 'text',
        borderTop: '0.25rem solid transparent',
        borderBottom: '0.25rem solid transparent',
        transition: 'all 325ms ease-in-out',
        bg: 'white',
        '&:hover': {
          background: 'var(--theme-ui-colors-light)',
          borderBottomWidth: '0.25rem',
          borderBottomStyle: 'solid',
          borderBottomColor: 'var(--theme-ui-colors-lightDark)',
          transform: 'none',
          cursor: 'pointer',
        },
        '&.selected': {
          background: 'var(--theme-ui-colors-light)',
          borderBottomWidth: '0.25rem',
          borderBottomStyle: 'solid',
          borderBottomColor: 'var(--theme-ui-colors-lightDark)',
          transform: 'none',
          cursor: 'pointer',
        },
      },
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
})
export default theme
