import typy from 'typy'
export const getImageService = (iiifManifest, index = 0) => {
  return typy(iiifManifest, `sequences[0].canvases[${index}].images[0]['_id']`).safeString
}
export const getImageServiceFromThumbnail = (iiifManifest) => {
  console.log(iiifManifest)
  return typy(iiifManifest, `thumbnail.service['_id']`).safeString
}
export default getImageService
