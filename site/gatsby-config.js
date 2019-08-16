const configuration = require('./content/configuration')
module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-theme-marble',
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
      // options required fields:
      // ====================================
      // name
      // short_name
      // start_url
      // background_color
      // theme_color
      // display
      // icon
      options: configuration.manifest,
    },
  ],
}
