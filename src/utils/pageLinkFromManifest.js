import typy from 'typy'
import md5 from 'md5'

export const pageLinkFromManifest = (iiifManifest) => {
  if (!typy(iiifManifest, '.type').isString) {
    return '/'
  }
  let type = 'item'
  if (typy(iiifManifest, '.type').safeString.toLowerCase() === 'sc:collection') {
    type = 'collection'
  }
  return `/${type}/${md5(iiifManifest.id)}`
}

export default pageLinkFromManifest
