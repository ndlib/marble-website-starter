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
    const spacing = 0.25
    return (
      <div
        className={style.alternateLink}
        style={{
          display: 'inline-block',
          margin: `0 ${spacing}rem`,
          height: `calc(100% / ${max} - ${(max - 1) * (spacing * 2)}rem / ${max})`,
          width: `calc(100% / ${max} - ${(max - 1) * (spacing * 2)}rem / ${max})`,
        }}>
        <ViewerLink
          iiifManifest={iiifManifest}
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
      </div>
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
