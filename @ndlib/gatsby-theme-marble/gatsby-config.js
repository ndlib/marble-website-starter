const path = require('path')

module.exports = ({
  contentPath = 'content',
  useLogin = false,
}) => ({
  // mapping: {
  //   'MarbleFile.collectionId': 'MarbleItem.id',
  // },
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        assets: path.join(__dirname, 'src/assets'),
        context: path.join(__dirname, 'src/context'),
        components: path.join(__dirname, 'src/components'),
        i18n: path.join(__dirname, 'src/i18n'),
        layouts: path.join(__dirname, 'src/layouts'),
        pages: path.join(__dirname, 'src/pages'),
        store: path.join(__dirname, 'src/store'),
        styles: path.join(__dirname, 'src/styles'),
        templates: path.join(__dirname, 'src/templates'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-next-seo',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${contentPath}/images`,
      },
    },
    // Themes do not use the pages directory by default so we add it in manually.
    {
      resolve : 'gatsby-plugin-page-creator',
      options: {
        path: useLogin ? path.join(__dirname, 'src/pages/app') : path.join(__dirname, 'src/pages/empty'),
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
    // this plugin highlights accessibility errors on the rendered pages
    // It should probably be removed from production
    {
      resolve: 'gatsby-plugin-accessibilityjs',
      options: {
        errorClassName: 'accessibility-error',
        onError: (error) => {
          console.warn(error)
        },
      },
    },
  ],
})
