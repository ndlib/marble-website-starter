/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import ViewerLink from 'components/Shared/ManifestImageGroup/ViewerLink'
import Image from 'components/Shared/Image'
import AlternateOverlay from './AlternateOverlay'
import buildReferalState from 'utils/buildReferalState'
import { getFieldValue } from 'components/Shared/Seo/helpers.js'
import { findAltImage } from 'utils/findImage'
import { jsx } from 'theme-ui'
import sx from './sx'

export const AlternateImage = ({
  allMarbleFile,
  marbleItem,
  index,
  max,
  length,
  viewer,
  location,
}) => {
  if (length > 1) {
    const isLast = max === index && max + 1 !== length
    const spacing = 0.25
    const data = {
      marbleItem,
    }
    marbleItem.alttext = function () {
      return (classification.length > 1 || material.length > 1)
        ? `This is called ${marbleItem.title} within the category of ${type}.`
        : 'Open in external viewer application'
    }
    const classification = (getFieldValue(null, 'Classification', data))
    const material = (getFieldValue(null, 'Material Type', data))
    const type = classification || material
    return (
      <div sx={sx.wrapper(spacing, max)}>
        <ViewerLink
          marbleItem={marbleItem}
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
            src={findAltImage(allMarbleFile, index)}
            alt={marbleItem.alttext()}
            title={`Alternate View ${index}`}
          />
        </ViewerLink>
      </div>
    )
  } return null
}

AlternateImage.propTypes = {
  allMarbleFile: PropTypes.object,
  marbleItem: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  viewer: PropTypes.string,
  location: PropTypes.object.isRequired,
}

export default AlternateImage
