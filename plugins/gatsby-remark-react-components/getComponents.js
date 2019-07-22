module.exports = (node) => {
  if (node && node.frontmatter) {
    if (node.frontmatter.components) {
      return node.frontmatter.components
    } else if (node.frontmatter.layout) {
      return getComponentsFromLayout(node.frontmatter.layout)
    }
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
    { component: 'ActionButtons' },
    { component: 'ManifestDescription' },
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
  test: [{ component: 'TestComponent' }],
}
