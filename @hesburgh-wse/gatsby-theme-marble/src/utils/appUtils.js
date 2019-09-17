// mock data
const user1 = {
  name: 'User Name',
  username: `username`,
  email: `rfox2@nd.edu`,
  bio: `Some kind of description goes here. Professors can put their class list here maybe, or you could say what kind of things you're interested in. There will be a character limit and it will be editable on the edit page.`,
}
const user2 = {
  name: 'Dan Wolfe',
  username: `dwolfe2`,
  email: `dwolfe2@nd.edu`,
  bio: `I have a short description, but Jon doesn't have one at all.`,
}

const user3 = {
  name: `Jon Hartzler`,
  username: `jhartzle`,
  email: `jhartzle@nd.edu`,
}
const items = [
  {
    id: 'sdfasdf',
    label: 'Absolution Under Fire',
    target: 'https://marble.library.nd.edu/item/1976.057',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://image-iiif.library.nd.edu:8182/iiif/2/1976.057%2F1976_057-v0001.tif/full/500,/0/default.jpg',
    iiifManifest: 'https://presentation-iiif.library.nd.edu/1976.057/manifest',
  },
  {
    id: 'sdfasdfsdf',
    label: 'Theophilus Parsons Journal Volume 2',
    target: 'https://marble.library.nd.edu/item/theophilus-journal-v2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://image-iiif.library.nd.edu:8182/iiif/2/theophilus-journal-v1%2Fdefault.tif/full/500,/0/default.jpg',
    iiifManifest: 'https://presentation-iiif.library.nd.edu/theophilus-journal-v2/manifest',
  },
  {
    id: 'asdfasdfasdf',
    label: 'Google',
    target: 'https://google.com',
    description: 'Here is a description of the following object.',
  },
]
const compilations = [
  {
    id: 'thing-1',
    title: `Test 1`,
    visibility: 'public',
    user: user1,
    description: `This is a public collection. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    items: items,
  },
  {
    id: 'thing-2',
    title: `Super Compilation of Stuff`,
    visibility: 'shared',
    user: user1,
    description: `This is a shared collection. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    items: items,
  },
  {
    id: 'thing-3',
    title: `My Secret Test Stuff`,
    visibility: 'private',
    user: user1,
    description: `This is a private collection. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    items: items,
  },
  {
    id: 'thing-1',
    title: `Test 1`,
    visibility: 'public',
    user: user2,
    description: `This is a public collection. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    items: items,
  },
  {
    id: 'thing-2',
    title: `Super Compilation of Stuff`,
    visibility: 'shared',
    user: user2,
    description: `This is a shared collection. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    items: items,
  },
  {
    id: 'thing-3',
    title: `My Secret Test Stuff`,
    visibility: 'private',
    user: user2,
    description: `This is a private collection. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
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
