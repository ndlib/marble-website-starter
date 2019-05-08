import React from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/Shared/Seo'
import ReturnToSearch from 'components/Shared/ReturnToSearch'
import Image from 'components/Shared/Image'
import { getImageServiceFromThumbnail } from 'utils/getImageService'

export const CollectionPreMain = ({ iiifManifest, location }) => {
  return (
    <React.Fragment>
      <SEO
        title={iiifManifest.label}
        image={iiifManifest.thumbnail._id}
        description={iiifManifest.description}
      />
      <Image
        service={getImageServiceFromThumbnail(iiifManifest)}
        region='pct:0,40,100,40'
        size='1200,'
        alt={iiifManifest.label}
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
