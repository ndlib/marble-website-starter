import typy from 'typy'
import getLanguage from 'utils/getLanguage'

export const copyrightCanDownload = (iiifManifest) => {
  const lang = getLanguage()
  const rsLabel = typy(iiifManifest, `requiredStatement.label[${lang}][0]`).safeString
  const rsValue = typy(iiifManifest, `requiredStatement.value[${lang}][0]`).safeString
  if (rsLabel.toLowerCase() === 'copyright' && rsValue.toLowerCase() === 'copyright') {
    return false
  }
  return true
}

export const imageUrl = (images, index, size, format) => {
  return images[index].replace('full/full', `full/${size}`).replace('default.jpg', `default.${format}`)
}

export const imageName = (iiifManifest, images, index, format) => {
  const numDigits = ('' + images.length).length
  const num = `${index + 1}`.padStart(numDigits, '0')
  return `${typy(iiifManifest, 'slug').safeString.replace('item/', '')}_${num}.${format}`
}

export const getImagesFromManifest = (iiifManifest) => {
  if (typy(iiifManifest, 'type').safeString.toLowerCase() === 'manifest') {
    return typy(iiifManifest, 'items').safeArray.map(item => {
      return typy(item, 'items[0].items[0].body.id').safeString
    })
  } else {
    return typy(iiifManifest, 'items').safeArray.map(item => {
      return typy(item, 'items[0].items[0].items[0].body.id').safeString
    })
  }
}
