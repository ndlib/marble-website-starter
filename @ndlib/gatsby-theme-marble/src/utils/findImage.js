import typy from 'typy'
import noImage from 'assets/images/noImage.svg'
export const findImage = (item, allFile) => {
  if (!typy(item, 'childrenMarbleIiifImage[0].name').isString) {
    return noImage
  }

  const result = allFile.nodes.find(file => {
    return file.name.includes(typy(item, 'childrenMarbleIiifImage[0].name').safeString)
  })
  return typy(result, 'publicURL').safeString || typy(item, 'childrenMarbleIiifImage[0].default').safeString
}
export default findImage

export const findAltImage = (item, allFile, index) => {
  if (!typy(item, 'childrenMarbleIiifImage[0].name').isString) {
    return noImage
  }

  const result = allFile.nodes.find(file => {
    return file.name.includes(typy(item, `childrenMarbleIiifImage[${index}].name`).safeString)
  })
  return typy(result, 'childImageSharp.fixed.src').safeString || `${typy(item, `childrenMarbleIiifImage[${index}].service`).safeString}/square/125,/0/default.jpg`
}
