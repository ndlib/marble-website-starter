import typy from 'typy'
export const getImageService = (iiifManifest, index = 0) => {
  if (typy(iiifManifest, `sequences[0].canvases[${index}].images[0]['_id']`).isString) {
    return iiifManifest.sequences[0].canvases[index].images[0]['_id']
  }
  return null
}
export const getImageServiceFromThumbnail = (iiifManifest) => {
  if (typy(iiifManifest, `thumbnail.service['_id']`).isString) {
    return iiifManifest.thumbnail.service['_id']
  }
  return null
}
export default getImageService
