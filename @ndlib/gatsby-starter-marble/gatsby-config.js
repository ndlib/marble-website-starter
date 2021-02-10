const configuration = require('./content/configuration')
module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    'gatsby-transformer-marbleitem',
    '@ndlib/gatsby-theme-marble',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'standard',
        path: 'content/json/standard',
      },
    },
  ],
}
