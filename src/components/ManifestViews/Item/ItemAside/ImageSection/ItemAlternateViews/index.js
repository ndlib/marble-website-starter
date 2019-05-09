import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import AlternateImage from './AlternateImage'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
// export max number of images to display so we don't have to update unit
// tests if/when this number changes
export const MAX_IMAGES = 4

const ItemAlternateViews = ({ iiifManifest }) => {
  const canvases = typy(iiifManifest, 'sequences[0].canvases').safeObject
  if (Array.isArray(canvases)) {
    // truncate at 4 alternate images
    const originalLength = canvases.length
    canvases.length = Math.min(MAX_IMAGES, canvases.length)
    return (
      <div>
        {
          canvases.map((canvas, index) => {
            return (
              <AlternateImage
                key={index}
                iiifManifest={iiifManifest}
                index={index}
                max={MAX_IMAGES}
                length={originalLength}
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
}

export default ItemAlternateViews
