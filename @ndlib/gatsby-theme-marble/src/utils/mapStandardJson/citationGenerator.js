
module.exports = (standardJson, slug) => {
  if (standardJson.repository) {
    if (standardJson.repository.toLowerCase() === 'museum') {
      return museumCitation(standardJson)
    } else if (standardJson.repository.toLowerCase() === 'rare' || standardJson.repository.toLowerCase() === 'unda') {
      return archivalCollectionCitation(standardJson, slug)
    }
  }
  return ''
}

const museumCitation = (standardJson) => {
  let citation = findArtist(standardJson.creators)
  citation += ', '
  citation += safeString(standardJson.title)
  citation += ', '
  citation += safeString(standardJson.createdDate)
  citation += ', '
  citation += safeString(standardJson.medium)
  citation += '. Snite Museum of Art, University of Notre Dame. '
  citation += safeString(standardJson.dedication)
  citation += ', '
  citation += safeString(standardJson.uniqueIdentifier)
  citation += '.'

  return citation
}

const archivalCollectionCitation = (standardJson, slug) => {
  // 'collection name, identifier. Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame, South Bend, IN. http://url'
  let citation = safeString(standardJson.title)
  citation += ', '
  citation += safeString(standardJson.uniqueIdentifier)
  citation += '. '
  if (standardJson.repository.toLowerCase() === 'rare') {
    citation += 'Rare Books & Special Collections'
  } else if (standardJson.repository.toLowerCase() === 'unda') {
    citation += 'University Archives'
  } else {
    console.error('Invalid repository for archival collections')
  }
  citation += ', Hesburgh Libraries, University of Notre Dame, South Bend, IN. '
  citation += `https://marble.nd.edu/${slug}`
  citation += '.'

  return citation
}

const findArtist = (creators) => {
  if (creators && creators.length > 0) {
    return creators[0]['fullName']
  }
}

const safeString = (field) => {
  if (field) {
    return field
  }
  return ''
}
