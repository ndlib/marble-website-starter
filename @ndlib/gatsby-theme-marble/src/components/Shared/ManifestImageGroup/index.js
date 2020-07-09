/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import noImage from 'assets/images/noImage.svg'
import { jsx } from 'theme-ui'
import sx from './sx'

export const ManifestImageGroup = ({ location, marbleItem, viewer }) => {
  if (!marbleItem) {
    return null
  }
  let viewerLabel = 'Mirador'
  if (viewer === 'uv') {
    viewerLabel = 'Universal Viewer'
  }
  const label = `Open in ${viewerLabel}`
  return (
    <section>
      <h2 className='accessibilityOnly'>Images</h2>
      <ViewerLink
        marbleItem={marbleItem}
        viewer={viewer}
        location={location}
      >
        <picture sx={sx.wrapper}>
          <img
            src={typy(marbleItem, 'childrenMarbleIiifImage[0].default').safeString || noImage}
            alt={label}
            title={label}
            sx={sx.image}
          />
          <ExpandIcon label={label} />
        </picture>
      </ViewerLink>
      <ItemAlternateViews
        marbleItem={marbleItem}
        location={location}
        viewer={viewer}
      />
    </section>
  )
}

ManifestImageGroup.propTypes = {
  marbleItem: PropTypes.shape({
    childrenMarbleIiifImage: PropTypes.arrayOf({
      default: PropTypes.string,
    }),
  }),
  location: PropTypes.object.isRequired,
  viewer: PropTypes.string,
}

ManifestImageGroup.defaultProps = {
  viewer: 'mirador',
}
export default ManifestImageGroup
