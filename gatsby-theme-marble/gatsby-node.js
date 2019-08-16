const configuration = require('./content/configuration.js')
const fs = require('fs')
const crypto = require('crypto')
const { attachFields } = require(`gatsby-plugin-node-fields`)

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
  # iiif stuff
  type iiifTranslatedString @dontInfer {
    en: [ String ]
    en_GB: [ String ]
    en_US: [ String ]
    fr: [ String ]
    none: [ String ]
  }

  type iiifLabeledString @dontInfer {
    label: iiifTranslatedString
    value: iiifTranslatedString
  }

  type iiifServiceJson @dontInfer {
    id: String
    _context: String
    profile: String
  }

  type iiifThumbnailJson @dontInfer {
    id: String
    type: String
    format: String
    service: [iiifServiceJson]
  }

  type iiifLogoJson @dontInfer {
    id: String
    type: String
    height: Int
    weight: Int
    format: String
  }

  type iiifHomepage @dontInfer {
    id: String
    type: String
    label: iiifTranslatedString
    format: String
  }

  type iiifSeeAlso @dontInfer {
    id: String
    type: String
    format: String
    profile: String
  }

  type iiifProviderJson @dontInfer {
    id: String
    type: String
    label: String
    homepage: [ iiifHomepage ]
    logo: [ iiifLogoJson ]
    seeAlso: [ iiifSeeAlso ]
  }

  type iiifItemAnnotationPageBody @dontInfer {
    id: String
    type: String
    format: String
    width: Int
    height: Int
    service: iiifServiceJson
  }

  type iiifItem @dontInfer {
    id: ID!
    type: String
    label: iiifTranslatedString
    height: Int
    width: Int
    summary: iiifTranslatedString
    requiredStatement: iiifLabeledString
    provider: iiifProviderJson
    rights: String
    viewingDirection: String
    service: iiifServiceJson
    motivation: String
    target: String
    body: iiifItemAnnotationPageBody
    seeAlso: [ iiifSeeAlso ]
    metadata: [iiifLabeledString]
    thumbnail: [iiifThumbnailJson]
    items: [iiifItem]
  }

  type IiifJson implements Node @dontInfer {
    # However Node fields are optional and you don't have to add them
    id: ID!
    _context: String
    type: String!
    slug: String!
    label: iiifTranslatedString!
    summary: iiifTranslatedString
    requiredStatement: iiifLabeledString
    provider: iiifProviderJson
    rights: String
    viewingDirection: String
    metadata: [iiifLabeledString]
    thumbnail: [iiifThumbnailJson]
    items: [iiifItem]
  }

  #react component stuff
  type prop {
    label: String
    value: String
    fileValue: File
  }

  type component {
    component: String
    props: [prop]
    components: [component]
  }

  type customFrontmatter {
    author: String
    components: [component]
    description: String
    layout: String
    slug: String
    title: String
  }

  type RemarkMarblePage implements Node {
    frontmatter: customFrontmatter
    fields: customFrontmatter
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
  type languages @dontInfer {
    default: String
    allowed: [String]
  }
  type SiteMetadata {
    universalViewerBaseURL: String
    googleMapApiURL: String
    searchBase: searchBase
    useBrandBar: Boolean
    headerColor: String
    institutionURL: String
    institutionLabel: String
    departmentURL: String
    departmentLabel: String
    footerText: String
    menus: [menus]
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

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allRemarkMarblePage {
        nodes {
          frontmatter{
            slug
            iiifJson {
              id
            }
          }
        }
      }
    }
  `).then(result => {
    const pages = result.data.allRemarkMarblePage.nodes

    pages.forEach(node => {
      const pagePath = node.frontmatter.slug === 'index' ? '/' : node.frontmatter.slug
      createPage({
        path: pagePath,
        component: require.resolve(`./src/templates/markdownTemplate.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.frontmatter.slug,
        },
      })
    })
    pages.forEach(node => {
      if (node.frontmatter.iiifJson) {
        createPage({
          path: `${node.frontmatter.slug}/mirador`,
          component: require.resolve(`./src/templates/miradorTemplate.js`),
          context: {
            slug: node.frontmatter.slug,
          },
        })
      }
    })
  })

  // non manifest tags
}

exports.onCreateNode = ({ node, actions, createNodeId }) => {
  const { createNode } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const fieldData = {
      frontmatter: node.frontmatter,
    }
    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> RemarkMarblePage`),
      parent: node.id,
      children: [],
      internal: {
        type: `RemarkMarblePage`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Enhanced markdown pages with react components`,
      },
    })
  }

  const descriptors = [
    {
      predicate: node => node.frontmatter,
      fields: [
        {
          name: 'components',
          getter: node => {
            return getComponents(node)
          },
          defaultValue: [{ component: 'MarkdownHtmlContent' }],
        },
      ],
    },
  ]
  attachFields(node, actions, descriptors)
}

const getComponents = (node) => {
  if (node && node.frontmatter) {
    if (node.frontmatter.components) {
      return node.frontmatter.components
    } else if (node.frontmatter.layout) {
      return getComponentsFromLayout(node.frontmatter.layout)
    }
  }
  return [{ component: 'MarkdownHtmlContent' }]
}

const getComponentsFromLayout = (layout) => {
  if (configuration.layouts) {
    return configuration.layouts[layout] || configuration.layouts.default
  }
  return [{ component: 'MarkdownHtmlContent' }]
}
