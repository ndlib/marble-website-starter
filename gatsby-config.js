module.exports = {
  siteMetadata: {
    title: `Collection SITE!!!`,
    author: `ndlib`,
    description: `A Gatsby Starter to build a site based on a collection of IIIF manifests.`,
    // apis and embedded urls
    universalViewerBaseURL: `https://viewer-iiif.library.nd.edu/universalviewer/index.html`,
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
        resolve: "gatsby-source-iiif",
        options: {
          manifests: [
            "https://presentation-iiif.library.nd.edu/collection/website",
//            "http://wellcomelibrary.org/iiif/collection/b18031511",
//            "http://wellcomelibrary.org/iiif/b18035723/manifest",
          ]
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
    `gatsby-transformer-iiif`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
