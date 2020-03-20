import merge from 'lodash.merge'
import { theme } from '@ndlib/gatsby-theme-marble/src/gatsby-plugin-theme-ui'
export default merge({}, theme, {
  colors: {
    primary: '#437D8A',
    secondary: '#575656',
    attention: '#aa272f',
    highlight: '#D39F10',
  },
  flexD: ['row', 'column'],
  fonts: {
    body: `
      GPBook
    `,
    heading: `
      EB Garamond
    `,
    logo: `
      GPCBold
    `,
    menu: `
      GPCBook
    `,
  },
})
