module.exports = {
  siteMetadata: {
    title: `Collection SITE!!!`,
    author: `ndlib`,
    description: `A Gatsby Starter to build a site based on a collection of IIIF manifests.`,
    // apis and embedded urls
    universalViewerBaseURL: process.env.MARBLE_UNIVERSAL_VIEWER_BASE_URL || `https://viewer-iiif.library.nd.edu/universalviewer/index.html`,
    primoSearchBaseURL: process.env.MARBLE_PRIMO_BASE_URL || `https://a1fc3ld3d7.execute-api.us-east-1.amazonaws.com/dev/primo/v1/search`,
    // branding
    institutionURL: process.env.MARBLE_INSTITUTION_URL || `https://marble.library.nd.edu`,
    institutionLabel: process.env.MARBLE_INSTITUTION_LABEL || `MARBLE`,
    departmentURL: process.env.MARBLE_DEPARTMENT_URL || ``,
    departmentLabel: process.env.MARBLE_DEPARTMENT_LABEL || ``,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-iiif',
      options: {
        manifests: [
          'https://presentation-iiif.library.nd.edu/collection/website',
          //  "http://wellcomelibrary.org/iiif/collection/b18031511",
          //  "http://wellcomelibrary.org/iiif/b18035723/manifest",
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/markdown`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        tableOfContents: {
          pathToSlugField: "frontmatter.slug",          
          heading: null,
          maxDepth: 6,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
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
