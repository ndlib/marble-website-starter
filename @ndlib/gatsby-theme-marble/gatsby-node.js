const fs = require('fs')
const path = require('path')
const mapStandardJson = require(path.join(__dirname, 'src/utils/mapStandardJson'))
// const crypto = require('crypto')
// const { attachFields } = require('gatsby-plugin-node-fields')
// const merge = require('lodash.merge')
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

// exports.createResolvers = ({ createResolvers }, options) => {
//   const basePath = options.basePath || '/'
//   createResolvers({})
// }

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
      allMarbleCollection {
        nodes {
          id
          slug
        }
      }
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

    // const ndJsonPages = result.data.allNdJson.nodes
    // ndJsonPages.forEach(node => {
    //   if (node.id) {
    //     // item page
    //     createPage({
    //       path: `item/${node.id}`,
    //       component: require.resolve('./src/templates/ndJson.js'),
    //       context: {
    //         // Data passed to context is available
    //         // in page queries as GraphQL variables.
    //         id: node.id,
    //         iiifUri: node.iiifUri,
    //       },
    //     })
    //     // mirador page
    //     createPage({
    //       path: `item/${node.id}/mirador`,
    //       component: require.resolve('./src/templates/miradorTemplate.js'),
    //       context: {
    //         id: node.id,
    //       },
    //     })
    //   }
    // })

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
  const { createNode } = actions

  // function to normalize node
  const normalizeNode = ({ newId, type, ndJson }) => {
    const mappedFields = mapStandardJson(ndJson)
    return {
      ...mappedFields,
      id: createNodeId(newId),
      marbleId: newId,
      slug: `item/${newId}`,
      internal: {
        type: type,
      },
    }
  }
  if (node.internal.type === 'NdJson') {
    if (node.level.toLowerCase() === 'collection') {
      // create parent collection
      const normalizedTypeNode = normalizeNode({
        newId: node.id,
        type: 'MarbleCollection',
        ndJson: node,
      })
      normalizedTypeNode.internal.contentDigest = createContentDigest(normalizedTypeNode)
      createNode(normalizedTypeNode)

      // create sub items
      node.items.forEach(item => {
        const newId = `${item.collectionId}/${item.id}`
        const normalizedTypeNode = normalizeNode({
          newId: newId,
          type: 'MarbleItem',
          ndJson: item,
        })

        normalizedTypeNode.internal.contentDigest = createContentDigest(normalizedTypeNode)
        createNode(normalizedTypeNode)
      })
    } else {
      const normalizedTypeNode = normalizeNode({
        newId: node.id,
        type: 'MarbleItem',
        ndJson: node,
      })
      normalizedTypeNode.internal.contentDigest = createContentDigest(normalizedTypeNode)
      createNode(normalizedTypeNode)
    }
  }
}

const buildSeeAlso = (ndJson) => {
  // if collection return child items
  // if item in collection return siblings
  // if top level item maybe run a search based on a set of fields
  return [
    'relatedId1',
    'relatedId2',
  ]
}

const buildImageFields = (ndJson, index = 0) => {
  // This will need to search for the first child (or grandchild) that has a valid image
  return {
    default: 'https://image.default.big',
    service: 'https://image.default',
    thumbnail: 'https://image.default.small',
  }
}

// Probably will not be able to reuse buildImageFields in a real scenario since buildImageFields will need to search for first good image.
const buildAllImages = (ndJson) => {
  const allImages = []
  if (ndJson.items) {
    ndJson.items.forEach((item, i) => {
      allImages.push(buildImageFields(ndJson, i))
    })
  }
  return allImages
}
// exports.onCreateNode = ({ node, actions, createNodeId }, options) => {
// const { createNode } = actions
// if (node.internal.type === 'MarkdownRemark') {
//   const fieldData = {
//     frontmatter: node.frontmatter,
//   }
//   createNode({
//     ...fieldData,
//     // Required fields.
//     id: createNodeId(`${node.id} >>> RemarkMarblePage`),
//     parent: node.id,
//     children: [],
//     internal: {
//       type: 'RemarkMarblePage',
//       contentDigest: crypto
//         .createHash('md5')
//         .update(JSON.stringify(fieldData))
//         .digest('hex'),
//       content: JSON.stringify(fieldData),
//       description: 'Enhanced markdown pages with react components',
//     },
//   })
// }

// const descriptors = [
//   {
//     predicate: node => node.frontmatter,
//     fields: [
//       {
//         name: 'components',
//         getter: node => {
//           return getComponents(node, options)
//         },
//         defaultValue: [{ component: 'MarkdownHtmlContent' }],
//       },
//     ],
//   },
// ]
// attachFields(node, actions, descriptors)
// }

// const getComponents = (node, options) => {
//   if (node && node.frontmatter) {
//     if (node.frontmatter.components) {
//       return node.frontmatter.components
//     } else if (node.frontmatter.layout) {
//       return getComponentsFromLayout(node.frontmatter.layout, options)
//     }
//   }
//   return [{ component: 'MarkdownHtmlContent' }]
// }

// const getComponentsFromLayout = (layout, options) => {
//   let availableLayouts = defaultLayouts
//   if (options.layouts) {
//     availableLayouts = merge({}, defaultLayouts, options.layouts)
//   }
//   return availableLayouts[layout] || availableLayouts.default
// }
