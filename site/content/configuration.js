const googleMapKey = process.env.GOOGLE_MAP_KEY || ``
const menus = require('./menus')
const themeColor = `#0A233F`
const languages = {
  default: 'en',
  allowed: ['en', 'en-US', 'en-GB', 'fr', 'none'],
}

module.exports = {
  // siteMetadata
  siteMetadata: {
    title: `Digital Collections`,
    author: `ndlib`,
    description: `A Gatsby Starter to build a site based on a collection of IIIF manifests.`,
    siteUrl: `https://marble.library.nd.edu`,

    // apis and embedded urls
    universalViewerBaseURL: `https://viewer-iiif.library.nd.edu/universalviewer/index.html`,
    googleMapApiURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`,
    searchBase: {
      app: 'website-test-index',
      url: 'https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com',
    },

    // paths
    loginPath: 'login',
    searchPath: 'search',

    // branding
    footerText: '<p>© 2019 University of Notre Dame</p><address>Notre Dame, IN 46556 USA</address><p><a href="/help/contact-us">Contact Us</a></p>',

    // menus
    menus: menus,

    //
    languages: languages,
  },

  // manifest
  manifest: {
    name: `Digital Collections`,
    short_name: `Digital Collections`,
    start_url: `/`,
    background_color: themeColor,
    theme_color: themeColor,
    display: `minimal-ui`,
    icon: `content/images/manifestLogo.png`,
  },

  // layouts
}
