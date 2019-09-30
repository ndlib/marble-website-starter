import merge from 'lodash.merge'
import { theme } from '@ndlib/gatsby-theme-marble/src/gatsby-plugin-theme-ui'
export default merge({}, theme, {
  colors: {
    primary: '#0A233F',
    secondary: '#333',
    highlight: '#D39F10',
  },
})
