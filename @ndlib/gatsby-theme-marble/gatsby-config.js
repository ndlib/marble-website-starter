const path = require('path')

module.exports = ({
  contentPath = 'content',
  useLogin = false,
  useUV = false,
}) => ({
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        assets: path.join(__dirname, 'src/assets'),
        context: path.join(__dirname, 'src/context'),
        components: path.join(__dirname, 'src/components'),
        i18n: path.join(__dirname, 'src/i18n'),
        pages: path.join(__dirname, 'src/pages'),
        store: path.join(__dirname, 'src/store'),
        styles: path.join(__dirname, 'src/styles'),
        templates: path.join(__dirname, 'src/templates'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `iiif`,
        path: `${contentPath}/json/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${contentPath}/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${contentPath}/markdown`,
      },
    },
    `gatsby-remark-copy-linked-files`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    // Themes do not use the pages directory by default so we add it in manually.
    {
      resolve : 'gatsby-plugin-page-creator',
      options: {
        path: useLogin ? path.join(__dirname, 'src/pages/app') : path.join(__dirname, 'src/pages/empty'),
      },
    },
    {
      resolve : 'gatsby-plugin-page-creator',
      options: {
        path: useUV ? path.join(__dirname, 'src/pages/viewer') : path.join(__dirname, 'src/pages/empty'),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `./src/utils/typography`,
    //   },
    // },
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
})
