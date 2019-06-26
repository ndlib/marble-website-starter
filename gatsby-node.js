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
      allIiifManifest {
        nodes {
          slug
          _type
        }
      },
      allBrowseCategory {
        nodes {
          id
          slug
          parentCategory {
            id
          }
        }
      },
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const tagTemplate = path.resolve('src/templates/browse.js')
    const iiifTemplate = path.resolve('src/templates/iiifTemplate.js')
    const manifests = result.data.allIiifManifest.nodes
    const browse = result.data.allBrowseCategory.nodes
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
      const slug = node.frontmatter.slug === 'index' ? '/' : node.frontmatter.slug
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/markdownTemplate.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.frontmatter.slug,
        },
      })
    })
  })

  // non manifest tags
}
