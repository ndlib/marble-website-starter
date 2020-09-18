import typy from 'typy'
import noImage from 'assets/images/noImage.svg'
export const findImage = (item) => {
  return typy(item, 'childrenMarbleIiifImage[0].local.publicURL').safeString ||
  typy(item, 'childrenMarbleIiifImage[0].default').safeString ||
  noImage
}
export default findImage

export const findAltImage = (item, index) => {
  if (typy(item, `childrenMarbleIiifImage[${index}].local.childImageSharp.fixed.src`).isString) {
    return typy(item, `childrenMarbleIiifImage[${index}].local.childImageSharp.fixed.src`).safeString
  }

  return typy(item, `childrenMarbleIiifImage[${index}].service`).isString
    ? `${typy(item, `childrenMarbleIiifImage[${index}].service`).safeString}/square/125,/0/default.jpg`
    : noImage
}
