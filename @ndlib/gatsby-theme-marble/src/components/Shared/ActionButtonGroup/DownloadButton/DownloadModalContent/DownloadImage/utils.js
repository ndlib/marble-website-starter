import typy from 'typy'

export const imageUrl = (images, index, size, format) => {
  return `${images[index].iiif.service}/full/${size}/0/default.${format}`
}

export const imageName = (ndJson, images, index, format) => {
  const numDigits = ('' + images.length).length
  const num = `${index + 1}`.padStart(numDigits, '0')
  return `${typy(ndJson, 'id').safeString}_${num}.${format}`
}
