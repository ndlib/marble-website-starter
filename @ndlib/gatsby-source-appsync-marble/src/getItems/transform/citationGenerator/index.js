
module.exports = (item, slug) => {
  if (item.repository) {
    if (item.repository.toLowerCase() === 'museum') {
      return museumCitation(item)
    } else if (item.repository.toLowerCase() === 'rare' || item.repository.toLowerCase() === 'unda') {
      return archivalCollectionCitation(item, slug)
    }
  }
  return ''
}

const museumCitation = (item) => {
  let citation = findArtist(item.creators)
  citation += ', '
  citation += safeString(item.title)
  citation += ', '
  citation += safeString(item.createdDate)
  citation += ', '
  citation += safeString(item.medium)
  citation += '. Snite Museum of Art, University of Notre Dame. '
  citation += safeString(item.dedication)
  citation += ', '
  citation += safeString(item.uniqueIdentifier)
  citation += '.'

  return citation
}

const archivalCollectionCitation = (item, slug) => {
  // 'collection name, identifier. Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame, South Bend, IN. http://url'
  let citation = safeString(item.title)
  citation += ', '
  citation += safeString(item.uniqueIdentifier)
  citation += '. '
  if (item.repository.toLowerCase() === 'rare') {
    citation += 'Rare Books & Special Collections'
  } else if (item.repository.toLowerCase() === 'unda') {
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
    if(creators[0].fullName) {
      return creators[0].fullName
    }else{
      return creators[0].default
    }
  }
}

const safeString = (field) => {
  if (field) {
    return field
  }
  return ''
}
