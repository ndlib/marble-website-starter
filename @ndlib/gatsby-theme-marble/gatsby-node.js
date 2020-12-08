const fs = require('fs')
const path = require('path')
const mapStandardJson = require(path.join(__dirname, 'src/utils/mapStandardJson'))
const pruneEmptyLeaves = require(path.join(__dirname, 'src/utils/pruneEmptyLeaves'))
const fileMetadata = require(path.join(__dirname, 'src/utils/mapStandardJson/fileMetadata'))

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'content'
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// predefine stuff we expect from configuration.js
exports.sourceNodes = ({ actions }) => {
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
    childrenMarbleFile: [MarbleFile]
    citation: String
    parentId: String
    marbleParent: MarbleItem @link(by: "id", from: "parentId")
  }

  # things expected to be there
  type searchBase @dontInfer {
    app: String
    url: String
  }
  type menuItems @dontInfer {
    id: String
    label: String
    link: String
  }
  type menus @dontInfer {
    id: String
    label: String
    items: [menuItems]
  }
  type defaultSearch @dontInfer {
    tag: String
  }
  type languages @dontInfer {
    default: String
    allowed: [String]
  }
  type authClient @dontInfer {
    url: String
    clientId: String
    issuer: String
  }
  type MarbleConfiguration implements Node @dontInfer {
    title: String!
    description: String!
    author: String!
    searchBase: searchBase
    menus: [menus]
    useLogin: Boolean
    userContentPath: String
    authClient: authClient
    languages: languages
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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarbleItem {
        nodes {
          id
          slug
        }
      }
    }
  `).then(result => {
    const pages = result.data && result.data.allMarkdownRemark ? result.data.allMarkdownRemark.nodes : []

    pages.forEach(node => {
      const pagePath = node.frontmatter.slug === 'index' ? '/' : node.frontmatter.slug
      createPage({
        path: pagePath,
        component: require.resolve('./src/templates/markdownTemplate.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.frontmatter.slug,
        },
      })
    })

    const marbleItems = result.data && result.data.allMarbleItem ? result.data.allMarbleItem.nodes : []
    marbleItems.forEach(node => {
      if (node.id) {
        // item page
        createPage({
          path: node.slug,
          component: require.resolve('./src/templates/marbleItem.js'),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.slug,
            id: node.id,
            iiifUri: node.iiifUri,
          },
        })
        // mirador page
        createPage({
          path: `${node.slug}/mirador`,
          component: require.resolve('./src/templates/miradorTemplate.js'),
          context: {
            id: node.id,
          },
        })
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, createNodeId, createContentDigest }, options) => {
  const { createNode, createParentChildLink } = actions

  const crawlStandardJson = (standardJson, collection, parent) => {
    const nodeId = createNodeId(standardJson.id)
    if (standardJson.level.toLowerCase() === 'file') {
      const filedata = fileMetadata(standardJson)
      const normalizedTypeNode = {
        ...filedata,
        id: nodeId,
        marbleId: standardJson.id,
        collection: collection.id,
        parentId: parent.id,
      }
      normalizedTypeNode.internal.contentDigest = createContentDigest(normalizedTypeNode)
      createNode(normalizedTypeNode)
      createParentChildLink({ parent: collection, child: normalizedTypeNode })
      createParentChildLink({ parent: parent, child: normalizedTypeNode })

      return
    }

    const mappedFields = mapStandardJson(standardJson)

    const normalizedTypeNode = {
      ...mappedFields,
      id: nodeId,
      marbleId: standardJson.id,
      parentId: parent ? parent.id : null,
      internal: {
        type: 'MarbleItem',
      },
    }

    if (!collection) {
      collection = normalizedTypeNode
    }

    if (parent) {
      // call create link
      normalizedTypeNode.parent = parent.id
      createParentChildLink({ parent: parent, child: normalizedTypeNode })
    }

    normalizedTypeNode.internal.contentDigest = createContentDigest(normalizedTypeNode)
    createNode(normalizedTypeNode)

    if (standardJson.items) {
      standardJson.items.forEach(item => {
        crawlStandardJson(item, collection, normalizedTypeNode)
      })
    }
  }

  if (node.internal.type === 'StandardJson') {
    pruneEmptyLeaves(node)
    crawlStandardJson(node)
  }
}
