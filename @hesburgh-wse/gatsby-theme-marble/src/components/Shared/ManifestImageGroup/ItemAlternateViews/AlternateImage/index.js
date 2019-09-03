import React from 'react'
import PropTypes from 'prop-types'
import ViewerLink from 'components/Shared/ManifestImageGroup/ViewerLink'
import Image from 'components/Shared/Image'
import AlternateOverlay from './AlternateOverlay'
import getImageService from 'utils/getImageService'
import buildReferalState from 'utils/buildReferalState'
import style from './style.module.css'

export const AlternateImage = ({ iiifManifest, index, max, length, viewer, location }) => {
  if (length > 1) {
    const isLast = max === index && max + 1 !== length
    return (
      <ViewerLink
        iiifManifest={iiifManifest}
        className={style.alternateLink}
        viewer={viewer}
        location={location}
        index={index}
        view={isLast ? 'gallery' : 'default'}
        state={buildReferalState(location, { type: 'item', backLink: location.href })}
      >
        <AlternateOverlay
          isLast={isLast}
          overlayNumber={length - max}
        />
        <Image
          iiifManifest={iiifManifest}
          index={index}
          service={getImageService(iiifManifest, index)}
          region='square'
          size='125,'
          alt={`Alternate View ${index}`}
          title={`Alternate View ${index}`}
          className={style.alternateImage}
        />
      </ViewerLink>
    )
  } return null
}

AlternateImage.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  viewer: PropTypes.string,
  location: PropTypes.object.isRequired,
}

export default AlternateImage
