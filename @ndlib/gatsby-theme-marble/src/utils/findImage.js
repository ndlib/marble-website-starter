import typy from 'typy'
import noImage from 'assets/images/noImage.svg'
import pdfImage from 'assets/images/pdf.svg'

// eslint-disable-next-line complexity
export const findImage = (images, marbleItem, thumbnail = false) => {
  // Find the first usable image
  const image = typy(images, 'nodes').safeArray.find(node => node.fileType === 'image') || typy(marbleItem, 'childrenMarbleFile').safeArray.find(file => file.fileType === 'image')
  if (image && thumbnail) {
    return typy(image, 'local.publicURL').safeString || typy(image, 'iiif.thumbnail').safeString
  } else if (image) {
    return typy(image, 'local.publicURL').safeString ||
    typy(image, 'iiif.default').safeString
  }

  // No images were found, check to see if it is a PDF
  const containsPDF = typy(marbleItem, 'childrenMarbleFile').safeArray.find(file => file.fileType === 'pdf')
  if (containsPDF) {
    return pdfImage
  }

  // No image and not a pdf, return noImage icon
  return noImage
}
export default findImage

export const findAltImage = (images, index) => {
  if (typy(images, `nodes[${index}].local.childImageSharp.fixed.src`).isString) {
    return typy(images, `nodes[${index}].local.childImageSharp.fixed.src`).safeString
  }

  return typy(images, `nodes[${index}].iiif.service`).isString
    ? `${typy(images, `nodes[${index}].iiif.service`).safeString}/square/125,/0/default.jpg`
    : noImage
}

export const findDefaultImage = (marbleItem, thumbnail = false) => {
  if (typy(marbleItem, 'defaultImage.default').isString) {
    if (thumbnail) {
      return marbleItem.defaultImage.thumbnail
    }
    return marbleItem.defaultImage.default
  }

  // No images were found, check to see if it is a PDF
  const containsPDF = typy(marbleItem, 'childrenMarbleFile').safeArray.find(file => file.fileType === 'pdf')
  if (containsPDF) {
    return pdfImage
  }

  // No image and not a pdf, return noImage icon
  return noImage
}
