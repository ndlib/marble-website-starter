/**
* Uses preset bootstrap as a basis
* https://github.com/system-ui/theme-ui/blob/develop/packages/preset-bootstrap/src/index.ts
*/

import { merge } from 'theme-ui'
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

const theme = merge(bootstrapTheme, {
  colors: colors,
  fontSizes: ['0.75rem', // '80%',
    '0.875rem',
    '1rem',
    '1.075rem',
    '1.25rem',
    '1.5rem',
    '1.75rem',
    '2rem',
    '2.5rem',
    '3.5rem',
    '4.5rem',
    '5.5rem',
    '6rem'],

  fonts: {
    body: `
    "Libre Franklin", "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif
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
    "Sumana", Georgia, "Times New Roman", Times, serif;
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
      "Libre Franklin", "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif
    `,
  },
  NDBrandHeader: {
    p: '0',
    display: 'grid',
    textAlign: 'left',
    borderTopWidth: '5px',
    borderTopColor: 'secondary',
    borderTopStyle: 'solid',
    backgroundColor: 'primary',
    borderBottomWidth: '5px',
    borderBottomColor: 'dark',
    borderBottomStyle: 'solid',
    '& .title': {
      mx: '5vw',
      mb: [0, 0, 0, '1.25rem'],
      p: ['.5rem 0', '.5rem 0', '1.5rem 0', '1.5rem 0 0'],
    },
    '& .mark': {
      my: ['.5rem', '.5rem', '1.5rem'],
    },
    '& .titleContainer': {
      borderBottomWidth: ['5px', '5px', '5px', 0],
      borderBottomColor: 'primaryDark',
      borderBottomStyle: 'solid',
    },
  },
  NDBrandLayout: {
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
    text: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'primaryBright',
      cursor: 'pointer',
      textDecoration: 'none',
      padding: '0',
      wordBreak: 'break-word',
      ':hover': {
        textDecoration: 'underline',
      },
    },
  },
  sections: {
    default: {
      bg: 'white',
      mx: '5vw',
      pl: '1vw',
      pb: '3rem',
      '& div.sectionContent': {
        minWidth: [0, 0, 0, '40rem'],
        maxWidth: '58rem',
      },
    },
    sidebar: {
      bg: 'white',
      mt: '5rem',
      pl: '5vw',
      '& div.sectionContent': {
        display: ['none', 'none', 'none', 'block'],
        minWidth: '16vw',
        maxWidth: '17vw',
      },
    },
    defaultWithSidebar: {
      bg: 'white',
      pl: '2rem',
      pb: '3rem',
      mr: '5vw',
      '& div.sectionContent': {
        minWidth: [0, 0, 0, '40rem'],
        maxWidth: '58rem',
      },
    },
    fullBleedWithSidebar: {
      bg: 'white',
      pl: ['5vw', '5vw', '5vw', '1vw'],
      pb: '3rem',
      mr: '5vw',
      '& div.sectionContent': {
        minWidth: '60vw',
        maxWidth: ['90vw', '90vw', '90vw', '72vw'],
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
        py: '4rem',
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
      fontWeight: 'heading',
      lineHeight: 'heading',
      color: 'primary',
    },
    menuHeading: {
      py: '1em',
    },
    lede: {
      fontSize: 3,
    },
    siteHeader: {
      m: 0,
      p: 0,
    },
    pageTitle: {
      ml: '0',
      fontSize: 8,
      color: 'primary',
      '::after': {
        content: '""',
        marginLeft: ['-0.1em', '-0.1em', '-0.1em', '-0.5em'],
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
      fontSize: 0,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    siteHeader: {
      color: 'white',
      textDecoration: 'none',
      fontFamily: 'title',
      fontSize: '8',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    navDrawer: {
      fontSize: 3,
      display: 'block',
      lineHeight: '1.2',
      textDecoration: 'none',
      color: 'text',
      p: '.5rem',
      '&:hover': {
        background: 'var(--theme-ui-colors-light)',
        textDecoration: 'none',
      },
      '&:focus': {
      },
    },
    navTop: {
      fontSize: 3,
      fontFamily: 'menu',
      fontWeight: 'normal',
      lineHeight: 1,
      padding: ['1rem 1.375rem', '1rem 1.375rem', '1rem 1.375rem', '1.25rem 1.375rem 1rem'],
      opacity: '1',
      textDecoration: 'none',
      color: 'gray.8',
      borderTop: '0.25rem solid transparent',
      borderBottomWidth: '0.25rem',
      borderBottomStyle: 'solid',
      borderBottomColor: 'transparent',
      transition: 'all 325ms ease-in-out',
      bg: 'white',
      zIndex: 5,
      '& svg': {
        display: 'block',
        mx: 'auto',
      },
      '& span': {
        display: ['block', 'block', 'block', 'none'],
        fontSize: 1,
      },
      '&.menuLinks': {
        display: ['none', 'none', 'none', 'flex'],
      },
      '&.menu': {
        display: ['block', 'block', 'block', 'none'],
      },
      '&.search': {
        bg: 'light',
        '&:hover': {
          borderBottomWidth: '0',
        },
      },
      '&:hover': {
        background: ['white', 'white', 'white', 'var(--theme-ui-colors-light)'],
        borderBottomWidth: '0.25rem',
        borderBottomStyle: 'solid',
        borderBottomColor: ['transparent', 'transparent', 'transparent', 'var(--theme-ui-colors-lightDark)'],
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
    navLeft: {
      py: '1rem',
      display: 'block',
      color: 'primary',
      textDecoration: 'none',
      '&:hover': {
        bg: 'var(--theme-ui-colors-light)',
        textDecoration: 'none',
      },
      '&.selected': {
        fontWeight: 'bold',
      },
    },
    footer: {
      color: 'white',
    },
  },
  navSearch: {
    default: {
      zIndex: '10',
      bg: 'light',
      borderBottomWidth: '0.25rem',
      borderBottomStyle: 'solid',
      borderBottomColor: ['transparent', 'transparent', 'transparent', 'var(--theme-ui-colors-lightDark)'],
    },
  },
  menus: {
    navLeft: {
      '& h3': {
        color: 'primary',
        p: '0',
      },
      '& div': {
        px: '.5rem',
        '& a': {
          padding: '0.7em 1em',
          '&.selected': {
            fontWeight: 'bold',
          },
        },
      },
    },
    navTop: {
      position: ['static', 'static', 'static', 'relative'],
      display: 'flex',
      top: '0',
      justifyContent: ['none', 'none', 'none', 'flex-end'],
      width: ['100%', '100%', '100%', 'inherit'],
      maxHeight: '80px',
      mt: [0, 0, 0, '-1.2rem'],
      borderBottomWidth: ['0.25rem', '0.25rem', '0.25rem', 0],
      borderBottomStyle: 'solid',
      borderBottomColor: ['gray.4', 'gray.4', 'gray.4'],
      mr: '5vw',
      '& div': {
        display: 'flex',
        minWidth: ['100vw', '100vw', '100vw', '550px'],
        justifyContent: ['space-around', 'space-around', 'space-around', 'flex-start'],
        opacity: '1',
        transition: 'all 1s',
        background: 'white',

      },
      '& input': {
        width: '100%',
        py: '1.1rem',
        bg: 'light',
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
    root: {
      color: 'text',
      variant: 'text.default',
      fontFamily: 'body',
    },
    li: {
      variant: 'text.default',
      fontFamily: 'body',
    },
    h1: {
      color: 'primary',
    },
    h2: {
      variant: 'text.heading',
      color: 'primary',
    },
    h3: {
      color: 'primary',
    },
    h4: {
      color: 'primary',
    },
    h5: {
      color: 'primary',
    },
    h6: {
      color: 'primary',
    },
  },
})
export default theme
