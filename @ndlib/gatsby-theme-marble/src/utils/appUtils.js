// mock data
const user1 = {
  name: `Jon Hartzler`,
  username: `jhartzle`,
  email: `jhartzle@nd.edu`,
  bio: `Some kind of description goes here. Professors can put their class list here maybe, or you could say what kind of things you're interested in. There will be a character limit and it will be editable on the edit page.`,
}
const user2 = {
  name: 'Dan Wolfe',
  username: `dwolfe2`,
  email: `dwolfe2@nd.edu`,
  bio: `I have a short description, but Jon doesn't have one at all.`,
}

const user3 = {
  name: `Abigail Shelton`,
  username: `ashelto3`,
  email: `ashelto3@nd.edu `,
}
const items = [
  {
    id: 'sdfasdf',
    index: 2,
    label: 'Absolution Under Fire',
    target: '/item/1976.057',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://image-iiif.library.nd.edu:8182/iiif/2/1976.057%2F1976_057-v0001.tif/full/500,/0/default.jpg',
    iiifManifest: 'https://presentation-iiif.library.nd.edu/1976.057/manifest',
  },
  {
    id: 'sdfasdfsdf',
    index: 1,
    label: 'Theophilus Parsons Journal Volume 2',
    target: '/item/theophilus-journal-v2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://image-iiif.library.nd.edu:8182/iiif/2/theophilus-journal-v1%2Fdefault.tif/full/500,/0/default.jpg',
    iiifManifest: 'https://presentation-iiif.library.nd.edu/theophilus-journal-v2/manifest',
  },
  {
    id: 'sdfasdfsdf1',
    index: 0,
    label: 'Memento Mori: Death Comes to the Table',
    target: '/item/1999.024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://image-iiif.library.nd.edu:8182/iiif/2/1999.024%2F1999_024-v0001.tif/full/500,/0/default.jpg',
    iiifManifest: 'https://presentation-iiif.library.nd.edu/1999.024/manifest',
  },
  {
    id: 'sdfasdfsdf2',
    index: 3,
    label: 'Toad Effigy Ballgame Yoke',
    target: '/item/1983.053.002',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://image-iiif.library.nd.edu:8182/iiif/2/1983.053.002%2F1983_053_002-v0001.tif/full/500,/0/default.jpg',
    iiifManifest: 'https://presentation-iiif.library.nd.edu/1983.053.002/manifest',
  },
  {
    id: 'sdfasdfsdf3',
    index: 4,
    label: 'Field House Gymnasium Burning',
    target: '/item/GNDL-45-02',
    description: '',
    image: 'https://image-iiif.library.nd.edu:8182/iiif/2/GNDL-45-02%2FGNDL-45-02.tif/full/500,/0/default.jpg',
    iiifManifest: 'https://presentation-iiif.library.nd.edu/GNDL-45-02/manifest',
  },
  {
    id: 'asdfasdfasdf',
    index: 5,
    label: 'Google',
    target: 'https://google.com',
    description: 'Here is a description of the following object.',
  },
  {
    id: 'sdfasdfsdf4',
    index: 6,
    label: 'Ferrell Manuscripts',
    target: 'https://collections.library.nd.edu/3861ba1690/ferrell-manuscripts',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://honeypot.library.nd.edu/images/honeycomb/000/067/024/670/SHOWCASE_03c-FerrellMS_03-01r-bk.jpg',
  },
]
const compilations = [
  {
    id: 'thing-1',
    title: `My First Test`,
    display: `annotated`,
    visibility: 'public',
    user: user1,
    description: `This is a public collection.`,
    items: items,
  },
  {
    id: 'thing-2',
    title: `Super Compilation of Stuff`,
    display: `default`,
    visibility: 'shared',
    user: user1,
    description: `This is a shared collection.`,
    items: items,
  },
  {
    id: 'thing-3',
    title: `My Secret Test Stuff`,
    display: `annotated`,
    visibility: 'private',
    user: user1,
    description: `This is a private collection.`,
    items: items,
  },
  {
    id: 'thing-4',
    title: `Test 1`,
    display: `default`,
    visibility: 'public',
    user: user2,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    items: items,
  },
  {
    id: 'thing-5',
    title: `Super Compilation of Stuff`,
    display: `default`,
    visibility: 'shared',
    user: user2,
    description: ``,
    items: items,
  },
  {
    id: 'thing-6',
    title: `My Secret Test Stuff`,
    display: `default`,
    visibility: 'private',
    user: user2,
    description: `This is a private collection. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    items: items,
  },
  {
    id: 'thing-7',
    title: `My First Test`,
    display: `annotated`,
    visibility: 'public',
    user: user3,
    description: `This is a public collection.`,
    items: items,
  },
  {
    id: 'thing-8',
    title: `Super Compilation of Stuff`,
    display: `default`,
    visibility: 'shared',
    user: user3,
    description: `This is a shared collection.`,
    items: items,
  },
  {
    id: 'thing-9',
    title: `My Secret Test Stuff`,
    display: `annotated`,
    visibility: 'private',
    user: user3,
    description: `This is a private collection.`,
    items: items,
  },
]

// end mock data
export const getUserCompilations = (username) => {
  return compilations.filter(compilation => {
    return compilation.user.username === username
  })
}

export const getCompilation = (compilationId) => {
  return compilations.find(compilation => {
    return compilation.id === compilationId
  })
}

export const getUser = (username) => {
  const users = [user1, user2, user3]
  return users.find(user => {
    return user.username === username
  })
}
