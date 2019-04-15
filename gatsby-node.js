/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
    	allIiifManifest {
      	nodes {
          slug
          _type
        }
      }
    }
  `).then(result => {
    result.data.allIiifManifest.nodes.forEach((node) => {
      const template = (node._type.toLowerCase() === 'sc:collection') ? 'iiif-collection.js' : 'iiif-manifest.js'
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/${template}`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
        },
      })
    })
  })
}
