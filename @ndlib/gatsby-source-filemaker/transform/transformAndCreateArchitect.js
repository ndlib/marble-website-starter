module.exports = async (architect, structure, gatsbyInternal) => {
  const { actions, createContentDigest, createNodeId } = gatsbyInternal
  const { createNode } = actions
  const fieldData = architect.fieldData
  const architectObject = {
    id: createNodeId(architect.recordId),
    displayName: fieldData.nameDisplay,
    alternateName: fieldData['Alternate Name'],
    firstName: fieldData.nameFirst,
    lastName: fieldData.nameLast,
    dateOfBirth: fieldData.dateBirth,
    dateOfDeath: fieldData.dateDeath,
    essayContent: fieldData.essayContent,
    type: fieldData.instanceType,
  }
  const nodeContent = JSON.stringify(architectObject)
  const normalizedTypeNode = {
    ...architectObject,
    internal: {
      type: 'SeasideArchitect',
      content: nodeContent,
      contentDigest: createContentDigest(architectObject),
    },
  }
  await createNode(normalizedTypeNode)
  return normalizedTypeNode
}
