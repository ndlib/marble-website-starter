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

export const ManifestImageGroup = ({ location, ndJson, viewer }) => {
  if (!ndJson || !ndJson.id) {
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
        ndJson={ndJson}
        viewer={viewer}
        location={location}
      >
        <picture sx={sx.wrapper}>
          <img
            src={typy(ndJson, 'items[0].iiifImageUri').isString ? `${ndJson.items[0].iiifImageUri}/full/full/0/default.jpg` : noImage}
            alt={label}
            title={label}
            sx={sx.image}
          />
          <ExpandIcon label={label} />
        </picture>
      </ViewerLink>
      <ItemAlternateViews
        ndJson={ndJson}
        location={location}
        viewer={viewer}
      />
    </section>
  )
}

ManifestImageGroup.propTypes = {
  ndJson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        iiifImageUri: PropTypes.string,
      }),
    ),
  }),
  location: PropTypes.object.isRequired,
  viewer: PropTypes.string,
}

ManifestImageGroup.defaultProps = {
  viewer: 'mirador',
}
export default ManifestImageGroup
