const configuration = require('./content/configuration')
module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    '@hesburgh-wse/gatsby-theme-marble',
  ],
}
