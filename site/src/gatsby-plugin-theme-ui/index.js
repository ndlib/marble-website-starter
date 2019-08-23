import merge from 'lodash.merge'
import { theme } from '@hesburgh-wse/gatsby-theme-marble/src/gatsby-plugin-theme-ui'
export default merge({}, theme, {
  colors: {
    primary: '#0A233F',
    secondary: '#333',
    highlight: '#ae9142',
  },
})
