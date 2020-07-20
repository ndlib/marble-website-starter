const path = require('path')
const allLanguageCodes = require(path.join(__dirname, 'data/allLanguageCodes'))

const mappedLanguageCodes = () => {
  const mapped = {}
  allLanguageCodes.forEach((language) => {
    if (language['alpha3-b']) {
      mapped[language['alpha3-b']] = language['English']
    }
  })
  return mapped
}

module.exports = mappedLanguageCodes()
