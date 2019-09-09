module.exports = {
  siteMetadata: {
    title: `Marble Collection Managment Tools`,
    author: `ndlib`,
    description: `A MARBLE Site to manage user created collections of IIIF things.`,
    siteUrl: `http://example.com`,
    // paths
    loginPath: 'login',
    searchPath: 'search',
    menus: [
      {
        id: 'top',
        label: '',
        items: [
          {
            id: 'user-page',
            label: 'My Stuff',
            link: '/user',
          },
        ],
      },
      {
        id: 'footer',
        label: '',
        items: [],
      },
    ],
  },
}
