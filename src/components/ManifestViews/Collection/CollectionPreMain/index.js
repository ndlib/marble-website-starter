import React from 'react'
import PropTypes from 'prop-types'
import ManifestSEO from 'components/ManifestViews/ManifestSEO'
import ReturnToSearch from 'components/Shared/ReturnToSearch'
import Image from 'components/Shared/Image'
import { getImageServiceFromThumbnail } from 'utils/getImageService'
import style from './style.module.css'

export const CollectionPreMain = ({ iiifManifest, location }) => {
  return (
    <React.Fragment>
      <ManifestSEO
        iiifManifest={iiifManifest}
        location={location}
      />
      <Image
        service={getImageServiceFromThumbnail(iiifManifest)}
        region='full'
        size='1200,'
        alt={iiifManifest.label}
        className={style.mainCollectionImage}
        iiifManifest={iiifManifest}
      />
      <ReturnToSearch location={location} />
    </React.Fragment>

  )
}

CollectionPreMain.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  location: PropTypes.object,
}
export default CollectionPreMain
