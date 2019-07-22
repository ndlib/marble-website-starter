const { attachFields } = require(`gatsby-plugin-node-fields`)
const getComponents = require(`./getComponents`)
exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
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

    type MarkdownRemarkFrontmatter {
      components: [component]
      layout: String
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
      fields: MarkdownRemarkFrontmatter
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions }) => {
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
