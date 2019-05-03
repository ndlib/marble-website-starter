import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import Image from 'components/Shared/Image'
import ItemAlternateViews from './ItemAlternateViews'
import getImageService from 'utils/getImageService'

export const ImageSection = ({ iiifManifest }) => {
  return (
    <section>
      <Link to={`/viewer?manifest=${encodeURIComponent(iiifManifest.id)}`}>
        <Image
          service={getImageService(iiifManifest)}
          alt={iiifManifest.description}
        />
      </Link>
      <ItemAlternateViews iiifManifest={iiifManifest} />
    </section>
  )
}

ImageSection.propTypes = {
  iiifManifest: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.object.isRequired,
  }).isRequired,
}
export default ImageSection
