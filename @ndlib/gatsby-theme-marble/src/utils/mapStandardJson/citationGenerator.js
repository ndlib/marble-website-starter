
export const citationGenerator = (standardJson, slug) => {
  if (standardJson.repository === 'museum') {
    return museumCitation(standardJson)
  }

  return ''
}

export const museumCitation = (standardJson) => {
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

export const archivalCollectionCitation = (standardJson, slug) => {
  // 'collection name, identifier. Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame, South Bend, IN. http://url'
  let citation = safeString(standardJson.title)
  citation += ', '
  citation += safeString(standardJson.uniqueIdentifier)
  citation += '. '
  if (standardJson.repository === 'rare') {
    citation += 'Rare Books and Special Collections'
  } else if (standardJson.repository === 'unda') {
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

export default citationGenerator
