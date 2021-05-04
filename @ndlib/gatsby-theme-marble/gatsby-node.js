const fs = require('fs')

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'content'
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// predefine stuff we expect from configuration.js
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
  ### Marble Item Stuff
  type metadataData @dontInfer {
    label: String
    value: [String]
    urlField: String
    type: String
  }
  type marbleIiifFile @dontInfer {
    default: String
    service: String
    thumbnail: String
  }
  type MarbleFile implements Node {
    id: String!
    marbleId: String!
    collection: MarbleItem
    parentId: String
    name: String
    title: String
    sequence: Int
    file: String
    extension: String
    fileType: String
    iiif: marbleIiifFile
    local: File @link(by: "name", from: "name")
    marbleParent: MarbleItem @link(by: "id", from: "parentId")
  }
  type MarbleItem implements Node {
    id: String!
    marbleId: String!
    slug: String!
    display: String
    title: String!
    description: String
    sequence: Int
    iiifUri: String
    partiallyDigitized: Boolean
    metadata: [metadataData]
    copyrightRestricted: Boolean
    childrenMarbleItem: [MarbleItem]
    childrenMarbleFile: [MarbleFile] @link(by: "parentId", from: "id")
    citation: String
    parentId: String
    marbleParent: MarbleItem @link(by: "id", from: "parentId")
    searchData: searchData
  }

  type searchData {
    id: String
    name: String
    creator: [String]
    collection: String
    parent: String
    identifier: [String]
    geographicLocation: [String]
    repository: String
    themeTag: [String]
    expandedThemeTag: [String]
    centuryTag: [String]
    date: String
    lowestSearchRange: Int
    highestSearchRange: Int
    workType: [String]
    thumbnail: String
    language: [String]
    type: String
    url: String
    formatTag: [String]
    allMetadata: [String]
  }

  # things expected to be there
  type menuItems @dontInfer {
    id: String
    label: String
    link: String
    icon: String
    selectedPatterns: [String]
  }
  type MenusJson implements Node @dontInfer {
    id: String
    label: String
    items: [menuItems]
  }
  type languages @dontInfer {
    default: String
    allowed: [String]
  }
  `
  createTypes(typeDefs)
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/user/)) {
    page.matchPath = '/user/*'
    // Update the page.
    createPage(page)
  } else if (page.path.match(/^\/myportfolio/)) {
    page.matchPath = '/myportfolio/*'
    // Update the page.
    createPage(page)
  }
}
