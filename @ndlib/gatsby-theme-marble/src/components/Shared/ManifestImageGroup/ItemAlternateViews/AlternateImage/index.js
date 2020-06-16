/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import ViewerLink from 'components/Shared/ManifestImageGroup/ViewerLink'
import Image from 'components/Shared/Image'
import AlternateOverlay from './AlternateOverlay'
// import getImageService from 'utils/getImageService'
import buildReferalState from 'utils/buildReferalState'
import { jsx } from 'theme-ui'
import sx from './sx'

export const AlternateImage = ({ ndJson, index, max, length, viewer, location }) => {
  if (length > 1) {
    const isLast = max === index && max + 1 !== length
    const spacing = 0.25
    return (
      <div sx={sx.wrapper(spacing, max)}>
        <ViewerLink
          ndJson={ndJson}
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
            ndJson={ndJson}
            index={index}
            service={ndJson.items[index].iiifImageUri}
            region='square'
            size='125,'
            alt={`Alternate View ${index}`}
            title={`Alternate View ${index}`}
          />
        </ViewerLink>
      </div>
    )
  } return null
}

AlternateImage.propTypes = {
  ndJson: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  viewer: PropTypes.string,
  location: PropTypes.object.isRequired,
}

export default AlternateImage
