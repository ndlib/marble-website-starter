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
  '&:hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  '& a': {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  '&.more a': {
    '&:after': {
      content: '" > "',
      color: 'secondary',
    },
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
      '&:hover': {
        ...buttonShared['&:hover'],
        bg: 'primaryBright',
      },
      '& a': {
        ...buttonShared['& a'],
        color: 'white',
      },
      '&.more a': {
        '&:after': {
          ...buttonShared['&.more a']['&:after'],
          color: 'white',
        },
      },
    },
    secondary: {
      ...buttonShared,
      bg: 'secondary',
      color: 'white',
      '&:hover': {
        ...buttonShared['&:hover'],
        bg: 'secondaryDark',
      },
      '& a': {
        ...buttonShared['& a'],
        color: 'white',
      },
    },
    light: {
      ...buttonShared,
      color: 'text',
      bg: 'light',
      '&:hover': {
        ...buttonShared['&:hover'],
        bg: 'lightDark',
      },
      '& a': {
        ...buttonShared['& a'],
        color: 'text',
      },
    },
    inverse: {
      ...buttonShared,
      color: 'primary',
      bg: 'white',
      '&:hover': {
        ...buttonShared['&:hover'],
        bg: 'lightLight',
      },
      '& a': {
        ...buttonShared['& a'],
        color: 'primary',
      },
    },
  },
  sections: {
    default: {
      bg: 'white',
      mx: '5vw',
      pb: '3rem',
      '& div.sectionContent': {
        minWidth: '60rem',
        maxWidth: '65rem',
      },
    },
    sidebar: {
      bg: 'white',
      mt: '5rem',
      pl: '5vw',
      '& div.sectionContent': {
        minWidth: '16vw',
        maxWidth: '17vw',
      },
    },
    defaultWithSidebar: {
      bg: 'white',
      pl: '2rem',
      pb: '3rem',
      '& div.sectionContent': {
        minWidth: '60rem',
        maxWidth: '65rem',
      },
    },
    fullBleedWithSidebar: {
      bg: 'white',
      pl: '1vw',
      pb: '3rem',
      mr: '5vw',
      '& div.sectionContent': {
        minWidth: '60vw',
        maxWidth: '72vw',
      },
    },
    fullBleed: {
      bg: 'white',
      ml: '4vw',
      pl: '1vw',
      mr: '5vw',
      pb: '3rem',
      '& div.sectionContent': {
        minWidth: '70vw',
        maxWidth: '90vw',
      },
    },
    fullBleedLight: {
      bg: 'light',
      px: '5vw',
      mb: '3rem',
      '& div.sectionImage': {
        m: '-1rem 0 -1rem 0',
      },
      '& div.sectionContent': {
        py: '2rem',
        width: '90vw',
      },
    },
    fullBleedDark: {
      bg: 'primary',
      color: 'white',
      px: '5vw',
      mb: '3rem',
      '& div.sectionImage': {
        m: '-1rem 0 -1rem 0',
      },
      '& div.sectionContent': {
        py: '2rem',
        width: '90vw',
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
    menuHeading: {
      color: 'primary',
      py: '1em',
    },
    lede: {
      fontSize: 4,
    },
    pageTitle: {
      color: 'primary',
      fontWeight: '100',
      fontSize: 7,
      ml: '0',
      '::after': {
        content: '""',
        marginLeft: '-0.5em',
        marginTop: '0.2em',
        marginBottom: '0.7em',
        width: '1.5em',
        height: '0.1em',
        minHeight: '5px',
        bg: 'secondary',
        display: 'block',
      },
    },
    sectionTitle: {
      fontSize: 7,
      color: 'primary',
    },
  },
  html: {
    default: {
      maxWidth: '65rem',
    },
    fullBleed: {
      maxWidth: '100vw',
    },
  },
  links: {
    default: {
      color: 'primaryBright',
      wordBreak: 'break-word',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    breadcrumb: {
      color: 'gray.7',
      mr: '0.75rem',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    navTop: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      fontSize: 2,
      padding: '1.2rem 1.375rem',
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
        textDecoration: 'none',
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
    footer: {
      color: 'white',
    },
    leftNav: {
      '& h3': {
        color: 'primary',
        p: '0',
      },
      '& div': {
        px: '.5rem',
        pb: '1rem',
        '& a': {
          padding: '0.7em 1em',
          '&.selected': {
            fontWeight: '700',
          },
        },
      },
      '& a': {
        py: '1rem',
        display: 'block',
        color: 'primary',
        textDecoration: 'none',
        '&:hover': {
          bg: 'var(--theme-ui-colors-light)',
          textDecoration: 'none',
        },
        '&.selected': {
          fontWeight: '700',
        },
      },
    },
  },
  navSearch: {
    default: {
      bg: 'light',
      borderBottomWidth: '0.25rem',
      borderBottomStyle: 'solid',
      borderBottomColor: 'var(--theme-ui-colors-lightDark)',
    },
  },
  menus: {
    navTop: {
      position: 'relative',
      display: 'flex',
      margin: '0 0 -2.7rem',
      justifyContent: 'flex-end',
      maxHeight: '80px',
      '& div': {
        display: 'flex',
        minWidth: '691px',
        opacity: '1',
        transition: 'all 1s',
        background: 'white',
        maxHeight: '80px',
        minHeight: '80px',
      },
      '& input': {
        width: '100%',
        py: '1.1rem',
        maxHeight: '80px',
        minHeight: '80px',
      },
    },
  },
  styles: {
    a: {
      color: 'primaryBright',
      textDecoration: 'none',
      wordBreak: 'break-word',
      ':hover': {
        textDecoration: 'underline',
      },
    },
    h2: {
      variant: 'text.heading',
    },
    root: {
      color: 'gray.4',
      variant: 'text.default',
    },
  },
})
export default theme
