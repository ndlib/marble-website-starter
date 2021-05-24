const Filemaker = require('./fmrest.js')
const transformAndCreateStructure = require('./transform/transformAndCreateStructure.js')
const transformAndCreateImage = require('./transform/transformAndCreateImage.js')
const transformAndCreateArchitect = require('./transform/transformAndCreateArchitect.js')

exports.sourceNodes = async (gatsbyInternal, pluginOptions) => {
  const { createParentChildLink } = gatsbyInternal.actions
  const { host, database, username, password } = pluginOptions

  /* do nothing for dev env */
  if (username === 'dev') {
    console.log('skipping fmp work for dev')
    return
  }

  const fm = new Filemaker({ username, password, host, database })
  await fm.login()
  const structureData = await fm.getAll('Structures')
  const imageData = await fm.getAll('Images')
  const architectData = await fm.getAll('Architects')
  structureData.response.data.forEach(async strutRecord => {
    const structureNode = await transformAndCreateStructure(strutRecord, gatsbyInternal)
    imageData.response.data.forEach(async imgRecord => {
      if (imgRecord.fieldData.Assoc_Structure_ID === strutRecord.fieldData.SRP_Structure_ID) {
        const imageNode = await transformAndCreateImage(imgRecord, structureNode, gatsbyInternal)
        createParentChildLink({ parent: structureNode, child: imageNode })
      }
    })
    architectData.response.data.forEach(async archRecord => {
      if (archRecord.fieldData.SRP_Agent_ID === strutRecord.fieldData.Architect_ID) {
        const archNode = await transformAndCreateArchitect(archRecord, structureNode, gatsbyInternal)
        createParentChildLink({ parent: structureNode, child: archNode })
      }
    })
  })
  await fm.logout()
}
