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

export const getFieldValue = (field, label, data) => {
  const metaField = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === label
  })
  return field || typy(metaField, 'value[0]').safeString || null
}

export const getAuthor = (author, data, siteMetadata) => {
  const creator = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Creator'
  })
  return author || typy(creator, 'value[0]').safeString || typy(siteMetadata, 'author').safeString ||
    null
}

export const getKeywords = (keywords, data) => {
  const metaKeywords = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Subject'
  })
  const subjects = metaKeywords ? metaKeywords.value.toString() : null
  return keywords || subjects || null
}
