const Filemaker = require('./fmrest.js')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, pluginOptions) => {
  const { createNode } = actions
  const { host, database, username, password } = pluginOptions

  /* do nothing for dev env */
  if (username === 'dev') {
    console.log('skipping fmp work for dev')
    return
  }

  const fm = new Filemaker({ username, password, host, database })
  await fm.login()
  await fm.getAll('Structures')
  await fm.logout()
}
