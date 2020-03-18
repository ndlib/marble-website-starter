import merge from 'lodash.merge'
import { theme } from '@ndlib/gatsby-theme-marble/src/gatsby-plugin-theme-ui'
export default merge({}, theme, {
  colors: {
    primary: '#437D8A',
    secondary: '#575656',
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
    menu: `
      GPCBook
    `,
  },
})
