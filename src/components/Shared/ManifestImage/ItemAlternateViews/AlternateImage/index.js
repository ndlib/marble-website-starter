import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import Image from 'components/Shared/Image'
import AlternateOverlay from './AlternateOverlay'
import getImageService from 'utils/getImageService'
import buildReferalState from 'utils/buildReferalState'
import style from './style.module.css'

export const AlternateImage = ({ iiifManifest, index, max, length, location }) => {
  if (length > 1) {
    return (
      <Link
        className={style.alternateLink}
        to={`/viewer?manifest=${encodeURIComponent(iiifManifest.id)}&cv=${index}`}
        state={buildReferalState(location, { type: 'item', backLink: location.href })}
      >
        <AlternateOverlay
          index={index}
          max={max}
          length={length}
        />
        <Image
          service={getImageService(iiifManifest, index)}
          region='square'
          size='125,'
          alt={`Alternate View ${index}`}
          title={`Alternate View ${index}. Opens in Universal Viewer.`}
          className={style.alternateImage}
        />
      </Link>
    )
  } return null
}

AlternateImage.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
}

export default AlternateImage
