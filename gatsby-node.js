/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
    	allIiifManifest {
      	nodes {
          slug
          tags
          _type
        }
      },
      allBrowseCategory {
        nodes{
          id
        }
      }
    }
  `).then(result => {
    const tagTemplate = path.resolve("src/templates/browse.js")
    const iiifCollectionTemplate = path.resolve(`./src/templates/iiif-collection.js`)
    const iiifItemTemplate = path.resolve(`./src/templates/iiif-manifest.js`)

    const manifests = result.data.allIiifManifest.nodes
    const browse = result.data.allBrowseCategory.nodes

    manifests.forEach((node) => {
      const template = (node._type.toLowerCase() === 'sc:collection') ? iiifCollectionTemplate : iiifItemTemplate
      createPage({
        path: node.slug,
        component: template,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
        },
      })
    })

    browse.forEach(node => {
      if (node.id === 'root') {
        createPage({
          path: `/browse`,
          component: tagTemplate,
          context: {
            tag: node.id,
          },
        })
      } else {
        createPage({
          path: `/browse/${_.kebabCase(node.id)}`,
          component: tagTemplate,
          context: {
            tag: node.id,
          },
        })
      }
    })

  })

  // non manifest tags
}
