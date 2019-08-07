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
    primoSearchBaseURL: `https://a1fc3ld3d7.execute-api.us-east-1.amazonaws.com/dev/primo/v1/search`,
    googleMapApiURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`,
    searchBase: {
      app: 'website',
      url: 'https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com',
    },

    // branding
    useBrandBar: false,
    headerColor: themeColor,
    institutionURL: `http://nd.edu`,
    institutionLabel: `University of Notre Dame`,
    departmentURL: `https://provost.nd.edu/`,
    departmentLabel: `Office of the Provost`,
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
    // icon: `src/assets/logos/manifestLogo.png`,
  },

  // layouts
  layouts: {
    default: [
      { component: 'MarkdownHtmlContent' },
    ],
    collection: [
      { component: 'ActionButtons' },
      { component: 'ManifestDescription' },
      { component: 'ManifestMetaData' },
      { component: 'ChildManifests' },
    ],
    item: [
      {
        component: 'MultiColumn',
        components: [
          {
            component: 'Column',
            components: [
              { component: 'ActionButtons' },
              { component: 'MiradorViewer' },
            ],
          },
          {
            component: 'Column',
            components: [
              { component: 'ManifestDescription' },
              { component: 'ManifestMetaData' },
            ],
          },
        ],
      },
    ],
    test: [{ component: 'TestComponent' }],
  },
}
