const googleMapKey = process.env.GOOGLE_MAP_KEY || ``
const searchUrl = process.env.SEARCH_URL || 'https://search-testy-search-testy-u2vq42wckv4epdwlul2nthzvsi.us-east-1.es.amazonaws.com'
// set this to be a website-local-index so we stop busting the main website.
const searchIndex = process.env.SEARCH_INDEX || 'marble-website'

console.log('ENVSSSSS: ', process.env)
console.log('~~~~values', process.env.SEARCH_URL, process.env.SEARCH_INDEX, searchUrl, searchIndex)

const menus = require('./menus')
const themeColor = `#0A233F`
const languages = {
  default: 'en',
  allowed: ['en'],
}

module.exports = {
  // siteMetadata
  siteMetadata: {
    title: `Digital Collections`,
    hideLogo: true,
    author: `ndlib`,
    description: `Notre Dame Digital Collections`,
    siteUrl: `https://marble.library.nd.edu`,
    searchBoxDefaultText: 'Search our digitized artwork, rare books, artifacts, and archival materials',
    // apis and embedded urls
    universalViewerBaseURL: `https://viewer-iiif.library.nd.edu/universalviewer/index.html`,
    googleMapApiURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`,
    searchBase: {
      app: searchIndex,
      url: searchUrl,
    },

    // paths
    useLogin: true,
    authClient: {
      url: `https://okta.nd.edu`,
      clientId: `0oa1f3ut0aKpdwap5357`,
      issuer: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
    },
    userContentPath: `https://b9mic83lu2.execute-api.us-east-1.amazonaws.com/prod/`,
    searchPath: 'search',
    iiifHelpURL: 'https://sites.nd.edu/marble/iiif-at-notre-dame-or-the-heart-of-marble/',
    // menus
    menus: menus,
    footerText: '',
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
