const configuration = require('./content/configuration')

module.exports = {
  // siteMetadata required fields:
  // ====================================
  // title
  // author
  // description
  // siteUrl
  // universalViewerBaseURL
  // googleMapApiURL
  // searchBase
  // useBrandBar
  // headerColor
  // institutionURL
  // institutionLabel,
  // departmentURL
  // departmentLabel
  // footerText
  // menus
  // languages
  siteMetadata: configuration.siteMetadata,
  plugins: [
    `gatsby-plugin-sitemap`,
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
    'gatsby-source-iiif',
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `iiif`,
        path: `${__dirname}/content/json`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/markdown`,
      },
    },
    `gatsby-remark-react-components`,
    {
      resolve: `gatsby-remark-react-components`,
      options: {
        defaultLayouts: configuration.layouts,
      },
    },
    `gatsby-remark-copy-linked-files`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    // Markdown pages
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        tableOfContents: {
          pathToSlugField: 'frontmatter.slug',
          heading: null,
          maxDepth: 6,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this plugin highlights accessibility errors on the rendered pages
    // It should probably be removed from production
    {
      resolve: `gatsby-plugin-accessibilityjs`,
      options: {
        injectStyles: `
          .accessibility-error {
            border: 3px solid #f00;
          }
        `,
        errorClassName: `accessibility-error`,
        onError: (error) => {
          console.warn(error)
        },
      },
    },
  ],
}
