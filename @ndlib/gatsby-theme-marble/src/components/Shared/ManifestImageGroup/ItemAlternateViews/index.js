import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import AlternateImage from './AlternateImage'

// export max number of images to display so we don't have to update unit
// tests if/when this number changes
export const MAX_IMAGES = 5

const ItemAlternateViews = ({ ndJson, viewer, location }) => {
  const canvases = typy(ndJson, 'items').safeArray
  if (canvases.length > 1) {
    return (
      <div>
        {
          canvases.slice(1, Math.min(MAX_IMAGES + 1, canvases.length)).map((canvas, index) => {
            return (
              <AlternateImage
                key={index}
                ndJson={ndJson}
                index={index + 1}
                max={MAX_IMAGES}
                length={canvases.length}
                location={location}
                viewer={viewer}
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
  ndJson: PropTypes.object.isRequired,
  viewer: PropTypes.string,
  location: PropTypes.object.isRequired,
}

export default ItemAlternateViews
