// configure environment variables
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
console.log(`Using environment config: '${activeEnv}'`)
require('dotenv').config({
  path: `.env.${activeEnv}`,
})

const googleMapKey = process.env.GOOGLE_MAP_KEY || ''
const userContentPath = process.env.USER_CONTENT_PATH || ''
const authClientURL = process.env.AUTH_CLIENT_URL || ''
const authClientClientId = process.env.AUTH_CLIENT_ID || ''
const authClientIssuer = process.env.AUTH_CLIENT_ISSUER || ''

const searchUrl = process.env.SEARCH_URL || ''
// set this to be a website-local-index so we stop busting the main website.
const searchIndex = process.env.SEARCH_INDEX || ''
console.table([
  { variable: 'SEARCH_INDEX:', value: searchIndex },
  { variable: 'SEARCH_URL:', value: searchUrl },
  { variable: 'GOOGLE_MAP_KEY:', value: googleMapKey },
  { variable: 'USER_CONTENT_PATH:', value: userContentPath },
  { variable: 'AUTH_CLIENT_URL:', value: authClientURL },
  { variable: 'AUTH_CLIENT_ID:', value: authClientClientId },
  { variable: 'AUTH_CLIENT_ISSUER:', value: authClientIssuer },
])

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
    googleMapApiURL: 'https://maps.googleapis.com/maps/api/js?key=' + googleMapKey + '&v=3.exp&libraries=geometry,drawing,places',
    searchBase: {
      app: searchIndex,
      url: searchUrl,
    },

    // paths
    useLogin: true,
    authClient: {
      url: authClientURL,
      clientId: authClientClientId,
      issuer: authClientIssuer,
    },
    userContentPath: userContentPath,
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
