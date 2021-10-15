const fs = require('fs')

module.exports = async (data, updateFixtures) => {
  await fs.writeFile(`../../@ndlib/gatsby-source-appsync-marble/data/${updateFixtures ? 'fixtureData' : 'debug'}.json`, JSON.stringify(data, null, 2), err => {
    console.error(err)
  })
  console.log('done writing file')
}
