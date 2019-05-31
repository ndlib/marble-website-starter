import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import AlternateImage from './AlternateImage'

// export max number of images to display so we don't have to update unit
// tests if/when this number changes
export const MAX_IMAGES = 4

const ItemAlternateViews = ({ iiifManifest, location }) => {
  const canvases = typy(iiifManifest, 'sequences[0].canvases').safeObject
  if (Array.isArray(canvases)) {
    return (
      <div>
        {
          canvases.slice(1, Math.min(MAX_IMAGES + 1, canvases.length)).map((canvas, index) => {
            return (
              <AlternateImage
                key={index}
                iiifManifest={iiifManifest}
                index={index + 1}
                max={MAX_IMAGES}
                length={canvases.length}
                location={location}
              />
            )
          })
        }
      </div>
    )
  }
  return null
}

ItemAlternateViews.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default ItemAlternateViews
