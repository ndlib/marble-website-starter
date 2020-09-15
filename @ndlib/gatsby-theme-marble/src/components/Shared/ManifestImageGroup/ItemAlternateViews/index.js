import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import AlternateImage from './AlternateImage'

// export max number of images to display so we don't have to update unit
// tests if/when this number changes
export const MAX_IMAGES = 5

const ItemAlternateViews = ({ marbleItem, viewer, location, allMarbleIiifImage }) => {
  if (typy(allMarbleIiifImage, 'nodes').safeArray.length > 1) {
    return (
      <div>
        {
          allMarbleIiifImage.nodes.slice(1, Math.min(MAX_IMAGES + 1, allMarbleIiifImage.nodes.length)).map((canvas, index) => {
            return (
              <AlternateImage
                allMarbleIiifImage={allMarbleIiifImage}
                key={index}
                marbleItem={marbleItem}
                index={index + 1}
                max={MAX_IMAGES}
                length={marbleItem.childrenMarbleIiifImage.length}
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
  allMarbleIiifImage: PropTypes.object,
  marbleItem: PropTypes.object.isRequired,
  viewer: PropTypes.string,
  location: PropTypes.object.isRequired,
}

export default ItemAlternateViews
