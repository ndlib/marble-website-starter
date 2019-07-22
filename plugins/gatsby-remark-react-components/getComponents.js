module.exports = (node, pluginOptions) => {
  if (node && node.frontmatter) {
    if (node.frontmatter.components) {
      return node.frontmatter.components
    } else if (node.frontmatter.layout) {
      return getComponentsFromLayout(node.frontmatter.layout, pluginOptions)
    }
  }
  return [{ component: 'MarkdownHtmlContent' }]
}

const getComponentsFromLayout = (layout, pluginOptions) => {
  if (pluginOptions.defaultLayout) {
    return pluginOptions.defaultLayouts[layout] || pluginOptions.defaultLayouts.default
  }
  return [{ component: 'MarkdownHtmlContent' }]
}
