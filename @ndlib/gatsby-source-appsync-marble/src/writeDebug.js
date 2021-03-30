const fs = require('fs')

module.exports = async (data) => {
  await fs.writeFile('../../@ndlib/gatsby-source-appsync-marble/data/debug.json', JSON.stringify(data, null, 2), err => {
    console.error(err)
  })
  console.log('done writing file')
}
