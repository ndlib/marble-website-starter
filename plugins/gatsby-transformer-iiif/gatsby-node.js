

exports.onCreateNode = ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
}) => {

  const determineSlug = (node) => {
    if (node._type.toLowerCase() === 'sc:collection') {
        return "collection/" + createNodeId(node.id)
    }
    return "item/" + createNodeId(node.id)
  }

  //console.log(node.internal.type)
  if (node.internal.type === `iiifManifest`) {
//    console.log("FIELDS")
//    console.log(console.log(node.type))

    //createNodeField({
    //  node,
    //  name: `slug`,
    ///  value: determineSlug(node),
    //})
  }
}
