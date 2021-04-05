import typy from 'typy'

export const getTitle = (title, data, siteMetadata) => {
  return title || typy(data, 'marbleItem.title').safeString || typy(siteMetadata, 'title').safeString
}

export const getUrl = (siteMetadata, location) => {
  return typy(siteMetadata, 'siteUrl').safeString + location
}

export const getImage = (data, defaultImage) => {
  return typy(data, 'marbleItem.childrenMarbleFile[0].iiif.default').safeString || typy(defaultImage, 'publicURL').safeString
}

export const getThumbnail = (data, defaultImage) => {
  return typy(data, 'marbleItem.childrenMarbleFile[0].iiif.thumbnail').safeString || typy(defaultImage, 'publicURL').safeString
}

export const getDescription = (description, data, siteMetadata) => {
  const metaDescription = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Summary'
  })
  return description || (typy(data, 'marbleItem.description').safeString || typy(metaDescription, 'value[0]').safeString) || typy(siteMetadata, 'description').safeString
}

export const getClassification = (classification, data) => {
  const metaClassification = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Classification'
  })
  return classification || (typy(metaClassification, 'value[0]').safeString) || null
}

export const getCreditText = (creditText, data) => {
  const metaCreditText = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Credit Line'
  })
  return creditText || (typy(metaCreditText, 'value[0]').safeString) || null
}

export const getAuthor = (author, data, siteMetadata) => {
  const creator = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Creator'
  })
  return author || typy(creator, 'value[0]').safeString || typy(siteMetadata, 'author').safeString ||
    null
}

export const getDimensions = (dimensions, data) => {
  const metaDimensions = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Dimensions'
  })
  return dimensions || (typy(metaDimensions, 'value[0]').safeString) || null
}

export const getDate = (date, data) => {
  const metaDate= typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Date'
  })
  return date || (typy(metaDate, 'value[0]').safeString) || null
}
