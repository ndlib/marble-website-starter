/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

// eslint-disable-next-line no-unused-vars
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

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
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              iiifJson {
                id
              }
            }
          }
        }
      }
    }
  `).then(result => {
    const tagTemplate = path.resolve('src/templates/browse.js')
    const iiifTemplate = path.resolve('src/templates/iiifTemplate.js')
    // const manifests = result.data.allIiifManifest.nodes
    const manifests = []
    // const browse = result.data.allBrowseCategory.nodes
    const browse = []
    const pages = result.data.allMarkdownRemark.edges

    manifests.forEach((node) => {
      createPage({
        path: node.slug,
        component: iiifTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          layout: node._type.toLowerCase(),
        },
      })
    })

    browse.forEach(node => {
      if (!node.parentCategory) {
        // createPage({
        //   path: `/browse`,
        //   component: tagTemplate,
        //   context: {
        //     slug: node.slug,
        //   },
        // })
      } else if (node.slug === '/browse/website') {
        createPage({
          path: `/browse`,
          component: tagTemplate,
          context: {
            slug: node.slug,
          },
        })
      } else {
        createPage({
          path: node.slug,
          component: tagTemplate,
          context: {
            slug: node.slug,
          },
        })
      }
    })

    pages.forEach(({ node }) => {
      const pagePath = node.frontmatter.slug === 'index' ? '/' : node.frontmatter.slug
      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/markdownTemplate.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.frontmatter.slug,
        },
      })
    })
    pages.forEach(({ node }) => {
      if (node.frontmatter.iiifJson) {
        createPage({
          path: `${node.frontmatter.slug}/mirador`,
          component: path.resolve(`./src/templates/miradorTemplate.js`),
          context: {
            slug: node.frontmatter.slug,
          },
        })
      }
    })
  })

  // non manifest tags
}

// predefine stuff we expect from configuration.js
exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
  type searchBase {
    app: String
    url: String
  }
  type menuItems {
    id: String
    label: String
    link: String
  }
  type menus {
    id: String
    label: String
    items: [menuItems]
  }
  type languages {
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

  type MarkdownRemarkFrontmatter {
    description: String
    author: String
  }
  type MarkdownRemark implements Node {
    frontmatter: MarkdownRemarkFrontmatter
  }
  `
  createTypes(typeDefs)
}
