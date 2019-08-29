const googleMapKey = process.env.GOOGLE_MAP_KEY || ``
const menus = require('./menus')
const layouts = require('./layouts')
const themeColor = `#0A233F`
const languages = {
  default: 'en',
  allowed: ['en', 'en-US', 'en-GB', 'fr', 'none'],
}

module.exports = {
  // siteMetadata
  siteMetadata: {
    title: `Epistemological Letters`,
    author: `ndlib`,
    description: `A test site for the Epistemological Letters.`,
    siteUrl: `https://marble.library.nd.edu`,

    // apis and embedded urls
    universalViewerBaseURL: `https://viewer-iiif.library.nd.edu/universalviewer/index.html`,
    googleMapApiURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`,
    // searchBase: {
    //   app: 'website-new-index',
    //   url: 'https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com',
    // },

    // paths
    // loginPath: 'login',
    // searchPath: 'search',

    // branding
    footerText: '<p>© 2019 University of Notre Dame</p><address>Notre Dame, IN 46556 USA</address><p><a href="/help/contact-us">Contact Us</a></p>',

    // menus
    menus: menus,

    //
    languages: languages,
  },

  // manifest
  manifest: {
    name: `Epistemological Letters`,
    short_name: `Epistemological Letters`,
    start_url: `/`,
    background_color: themeColor,
    theme_color: themeColor,
    display: `minimal-ui`,
    icon: `content/images/manifestLogo.png`,
  },

  // layouts
  layouts: layouts,
}
