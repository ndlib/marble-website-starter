module.exports = async (record, gatsbyInternal) => {
  const { actions, createContentDigest, createNodeId } = gatsbyInternal
  const { createNode } = actions
  const fieldData = record.fieldData
  const structureObject = {
    id: createNodeId(record.recordId),
    structureId: fieldData.SRP_Structure_ID,
    architectId: fieldData.Architect_ID,
    architect1: fieldData.Architect_1,
    architect2: fieldData.Architect_2,
    architect3: fieldData.Architect_3,
    address: fieldData.address,
    latitude: fieldData.Lat,
    longitude: fieldData.Long,
    lot: fieldData.Lot,
    block: fieldData.Block,
    section: fieldData.Section,
    description: fieldData['Project Description'],
    name1: fieldData.Structure_Name_1,
    name2: fieldData.Structure_Name_2,
    name3: fieldData.Structure_Name_3,
    codeType: fieldData['Code Type'],
    buildingType: fieldData['Building Type'],
    constructionStart: fieldData.Construction_Start,
    constructionEnd: fieldData.Construction_End,
    numFloors: fieldData.Floors,
    seasideEssayPid: fieldData.seasideEssayPid,
  }
  const nodeContent = JSON.stringify(structureObject)
  const normalizedTypeNode = {
    ...structureObject,
    internal: {
      type: 'SeasideStructure',
      content: nodeContent,
      contentDigest: createContentDigest(structureObject),
    },
  }
  await createNode(normalizedTypeNode)
  return normalizedTypeNode
}
