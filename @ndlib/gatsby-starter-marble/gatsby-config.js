const configuration = require('./content/configuration')
module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    '@ndlib/gatsby-theme-marble',
  ],
}
