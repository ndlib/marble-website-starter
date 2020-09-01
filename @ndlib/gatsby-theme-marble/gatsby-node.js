const fs = require('fs')
const path = require('path')
const mapStandardJson = require(path.join(__dirname, 'src/utils/mapStandardJson'))
const imageMetadata = require(path.join(__dirname, 'src/utils/mapStandardJson/imageMetadata'))

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
  type MarbleIiifImage implements Node @dontInfer {
    id: String!
    marbleId: String!
    service: String
    default: String
    thumbnail: String
    title: String
    name: String
    extension: String
    collection: MarbleItem
    parent: MarbleItem
    sequence: Int
  }
  type MarbleItem implements Node @dontInfer {
    id: String!
    marbleId: String!
    slug: String!
    display: String
    title: String!
    description: String
    parent: MarbleItem
    sequence: Int
    iiifUri: String
    partiallyDigitized: Boolean
    metadata: [metadataData]
    copyrightRestricted: Boolean
    childrenMarbleItem: [MarbleItem]
    childrenMarbleIiifImage: [MarbleIiifImage]
    citation: String
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
  type SiteMetadata @dontInfer {
    universalViewerBaseURL: String
    googleMapApiURL: String
    iiifHelpURL: String
    searchBase: searchBase
    footerText: String
    menus: [menus]
    hideLogo: Boolean
    useLogin: Boolean
    userContentPath: String
    authClient: authClient
    searchPath: String
    languages: languages
  }
  type Site implements Node {
    siteMetadata: SiteMetadata
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
      allMarkdownRemark {
        nodes {
          frontmatter{
            slug
          }
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
      const fileMetadata = imageMetadata(standardJson)
      const normalizedTypeNode = {
        ...fileMetadata,
        id: nodeId,
        marbleId: standardJson.id,
        collection: collection.id,
        internal: {
          type: 'MarbleIiifImage',
        },
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

  if (node.internal.type === 'NdJson') {
    crawlStandardJson(node)
  }
}
