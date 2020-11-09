const configuration = require('./content/configuration')
const s3BucketName = process.env.S3_BUCKET_NAME || ''

module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    {
      resolve: '@ndlib/gatsby-theme-marble',
      options: {
        // layouts: configuration.layouts,
        useLogin: configuration.siteMetadata.useLogin,
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
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: s3BucketName,
      },
    },
  ],
}
