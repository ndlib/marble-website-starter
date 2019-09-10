const configuration = require('./content/configuration')
module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    {
      resolve: '@hesburgh-wse/gatsby-theme-marble',
      options: {
        useLogin: true,
        useUV: true,
      },
    },
  ],
}
