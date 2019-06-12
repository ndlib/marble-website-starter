import React from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/Shared/Seo'
import ReturnToSearch from 'components/Shared/ReturnToSearch'
import Image from 'components/Shared/Image'
import { getImageServiceFromThumbnail } from 'utils/getImageService'
import style from './style.module.css'

export const CollectionPreMain = ({ iiifManifest, location }) => {
  return (
    <React.Fragment>
      <SEO
        title={iiifManifest.label}
        image={iiifManifest.thumbnail._id}
        description={iiifManifest.description}
        pathname={location.pathname}
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
