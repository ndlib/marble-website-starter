const { attachFields } = require(`gatsby-plugin-node-fields`)

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
          defaultValue: defaultLayouts.default,
        },
      ],
    },
  ]
  attachFields(node, actions, descriptors)
}

const getComponents = (node) => {
  if (node.frontmatter.components) {
    return node.frontmatter.components
  } else if (node.frontmatter.layout) {
    return getComponentsFromLayout(node.frontmatter.layout)
  }
  return defaultLayouts.default
}

const getComponentsFromLayout = (layout) => {
  return defaultLayouts[layout] || defaultLayouts.default
}

const defaultLayouts = {
  default: [
    { component: 'MarkdownHtmlContent' },
  ],
  collection: [
    { component: 'ChildManifests' },
  ],
  item: [
    {
      component: 'MultiColumn',
      components: [
        {
          component: 'Column',
          components: [
            { component: 'ActionButtons' },
            { component: 'ManifestImage' },
          ],
        },
        {
          component: 'Column',
          components: [
            { component: 'ManifestDescription' },
            { component: 'ManifestMetaData' },
          ],
        },
      ],
    },
  ],
}
