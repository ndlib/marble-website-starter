const configuration = require('./content/configuration')
module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    {
      resolve: '@hesburgh-wse/gatsby-theme-marble',
      options: {
        // layouts: configuration.layouts,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: configuration.siteMetadata.siteUrl,
        sitemap: `${configuration.siteMetadata.siteUrl}/sitemap.xml`,
        env: {
          development: {
            policy: [
              { userAgent: '*', disallow: ['/'] },
            ],
          },
          production: {
            policy: [
              { userAgent: '*', disallow: ['/'] },
              // { userAgent: '*', allow: '/' },
            ],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: configuration.manifest,
    },
  ],
}
