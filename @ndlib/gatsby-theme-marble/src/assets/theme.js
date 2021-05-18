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
        color: 'primary',
      },
    },
  },
  sections: {
    default: {
      bg: 'white',
      maxWidth: '65rem',
      mx: '5vw',
      py: '2rem',
      /*
      '& div.sectionContent': {
        maxWidth: '65rem',
        py: '2rem',
      },
      '& div.sectionImage': {
      },
      */
    },
    sidebar: {
      bg: 'white',
      mt: '5rem',
      pl: '5vw',
      maxWidth: '22vw',
    },
    defaultWithSidebar: {
      bg: 'white',
      maxWidth: '65rem',
      px: '2rem',
      py: '2rem',
    },
    fullBleedWithSidebar: {
      bg: 'white',
      px: '2rem',
      py: '2rem',
    },
    fullBleed: {
      bg: 'white',
      px: '5vw',
      py: '2rem',
      /*
      '& div.sectionImage': {
        m: '-2rem 0 -2rem 5vw',
      },
      '& div.sectionContent': {
        maxWidth: '90vw',
        alignSelf: 'center',
        py: '2rem',
      },
      */
    },
    fullBleedLight: {
      bg: 'light',
      px: '5vw',
      my: '2rem',
      '& div.sectionImage': {
        m: '-1rem 0 -1rem 0',
      },
      '& div.sectionContent': {
        maxWidth: '65rem',
        alignSelf: 'center',
        py: '2rem',
        width: 'auto',
      },
    },
    fullBleedDark: {
      bg: 'primary',
      color: 'white',
      px: '5vw',
      my: '2rem',
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
    },
    footer: {
      '& a': {
        color: 'white',
        py: '25px',
        px: '25px',
        textDecoration: 'none',
        fontWeight: '600',
        fontFamily: 'heading',
      },
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
