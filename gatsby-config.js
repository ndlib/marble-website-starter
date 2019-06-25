const menus = require('./content/menus')
const exhibitions = require('./content/exhibitions')

const googleMapKey = process.env.GOOGLE_MAP_KEY || ``
const gooleMapApiURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`
const siteUrl = process.env.MARBLE_SITEURL || `https://marble.library.nd.edu`

module.exports = {
  siteMetadata: {
    title: `Digital Collections`,
    author: `ndlib`,
    description: `A Gatsby Starter to build a site based on a collection of IIIF manifests.`,

    // required for sitemap
    siteUrl:  siteUrl,

    // apis and embedded urls
    universalViewerBaseURL: process.env.MARBLE_UNIVERSAL_VIEWER_BASE_URL || `https://viewer-iiif.library.nd.edu/universalviewer/index.html`,
    primoSearchBaseURL: process.env.MARBLE_PRIMO_BASE_URL || `https://a1fc3ld3d7.execute-api.us-east-1.amazonaws.com/dev/primo/v1/search`,
    gooleMapApiURL: gooleMapApiURL,
    searchBase: {
      app: process.env.MARBLE_SEARCHBASE_APP || 'website',
      url: process.env.MARBLE_SEARCHBASE_URL || 'https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com',
    },

    // branding
    institutionURL: process.env.MARBLE_INSTITUTION_URL || `http://nd.edu`,
    institutionLabel: process.env.MARBLE_INSTITUTION_LABEL || `University of Notre Dame`,
    departmentURL: process.env.MARBLE_DEPARTMENT_URL || `https://provost.nd.edu/`,
    departmentLabel: process.env.MARBLE_DEPARTMENT_LABEL || `Office of the Provost`,
    footerText: '<p>© 2019 University of Notre Dame</p><address>Notre Dame, IN 46556 USA</address><p><a href="/help/contact-us">Contact Us</a></p>',

    // menus
    menus: menus,
    exhibitions: exhibitions,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/markdown`,
      },
    },
    'gatsby-source-iiif',
    `gatsby-remark-copy-linked-files`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Digital Collections`,
        short_name: `collections`,
        start_url: `/`,
        background_color: `#0A233F`,
        theme_color: `#0A233F`,
        display: `minimal-ui`,
        icon: `src/assets/logos/manifestLogo.png`,
      },
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
