import typy from 'typy'

export const copyrightCanDownload = (ndJson) => {
  const rsValue = typy(ndJson, 'copyrightStatus').safeString
  if (rsValue.toLowerCase() === 'copyright') {
    return false
  }
  return true
}

export const imageUrl = (images, index, size, format) => {
  return images[index].replace('full/full', `full/${size}`).replace('default.jpg', `default.${format}`)
}

export const imageName = (ndJson, images, index, format) => {
  const numDigits = ('' + images.length).length
  const num = `${index + 1}`.padStart(numDigits, '0')
  return `${typy(ndJson, 'id').safeString}_${num}.${format}`
}

export const getImagesFromManifest = (ndJson) => {
  if (typy(ndJson, 'level').safeString.toLowerCase() === 'manifest') {
    return typy(ndJson, 'items').safeArray.map(item => {
      return typy(item, 'iiifImageUri').isString ? `${item.iiifImageUri}/full/full/0/default.jpg` : null
    })
  } else {
    return typy(ndJson, 'items').safeArray.map(item => {
      return typy(item, '.items[0].iiifImageUri').isString ? `${item.items[0].iiifImageUri}/full/full/0/default.jpg` : null
    })
  }
}
