import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import AlternateImage from './AlternateImage'

// export max number of images to display so we don't have to update unit
// tests if/when this number changes
export const MAX_IMAGES = 5

const ItemAlternateViews = ({ marbleItem, viewer, location, allMarbleFile }) => {
  if (typy(allMarbleFile, 'nodes').safeArray.length > 1) {
    return (
      <div>
        {
          allMarbleFile.nodes.slice(1, Math.min(MAX_IMAGES + 1, allMarbleFile.nodes.length)).map((canvas, index) => {
            return (
              <AlternateImage
                allMarbleFile={allMarbleFile}
                key={index}
                marbleItem={marbleItem}
                index={index + 1}
                max={MAX_IMAGES}
                length={marbleItem.childrenMarbleFile.length}
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
  allMarbleFile: PropTypes.object,
  marbleItem: PropTypes.object.isRequired,
  viewer: PropTypes.string,
  location: PropTypes.object.isRequired,
}

export default ItemAlternateViews
