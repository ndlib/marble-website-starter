import React from 'react'
import PropTypes from 'prop-types'
import Image from 'components/Shared/Image'
import getImageService from 'utils/getImageService'

const ManifestImage = ({
  iiifManifest,
  alt,
  title,
  index = 0,
}) => {
  const newAlt = alt || iiifManifest.description
  const newTitle = title || iiifManifest.name
  return (
    <Image
      service={getImageService(iiifManifest, index)}
      alt={newAlt}
      sxStyle={{}}
      title={newTitle}
      iiifManifest={iiifManifest}
    />
  )
}

ManifestImage.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  index: PropTypes.number,
  alt: PropTypes.string,
  title: PropTypes.string,
}

export default ManifestImage
