import typy from 'typy'
import noImage from 'assets/images/noImage.svg'
export const findImage = (images) => {
  return typy(images, 'nodes[0].local.publicURL').safeString ||
  typy(images, 'nodes[0].default').safeString ||
  noImage
}
export default findImage

export const findAltImage = (images, index) => {
  if (typy(images, `nodes[${index}].local.childImageSharp.fixed.src`).isString) {
    return typy(images, `nodes[${index}].local.childImageSharp.fixed.src`).safeString
  }

  return typy(images, `nodes[${index}].service`).isString
    ? `${typy(images, `nodes[${index}].service`).safeString}/square/125,/0/default.jpg`
    : noImage
}
