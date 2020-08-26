import typy from 'typy'
export const getImageService = (iiifManifest, index = 0) => {
  if (typy(iiifManifest, `items[${index}].items[0].items[0].body.service[0].id`).isString) {
    return iiifManifest.items[index].items[0].items[0].body.service[0].id
  }
  return null
}
export const getImageServiceFromThumbnail = (iiifManifest) => {
  if (typy(iiifManifest, 'thumbnail[0].service[0].id').isString) {
    return iiifManifest.thumbnail[0].service[0].id
  }
  return null
}
export default getImageService
