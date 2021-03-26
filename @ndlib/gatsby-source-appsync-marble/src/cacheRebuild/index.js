module.exports = (cachedMarbleNodes, gatsbyInternal) => {
  console.log('i have the cache')
  const { createNode } = gatsbyInternal.actions
  cachedMarbleNodes.forEach(node => {
    // Gatsby sets owner internally so this field cannot exists for cache rebuild.
    delete node.internal.owner
    createNode(node)
  })
  return null
}
