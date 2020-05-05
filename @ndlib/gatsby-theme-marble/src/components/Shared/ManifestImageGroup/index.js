/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import getLanguage from 'utils/getLanguage'
import noImage from 'assets/images/noImage.svg'
import { jsx } from 'theme-ui'
import sx from './sx'

export const ManifestImageGroup = ({ location, iiifManifest, viewer }) => {
  if (!iiifManifest || !iiifManifest.id) {
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
        iiifManifest={iiifManifest}
        viewer={viewer}
        location={location}
      >
        <picture sx={sx.wrapper}>
          <img
            src={typy(iiifManifest, 'items[0].items[0].items[0].body.id').safeString || noImage}
            alt={typy(iiifManifest, `summary[${getLanguage()}][0]`).safeString}
            title={label}
            sx={sx.image}
          />
          <ExpandIcon label={label} />
        </picture>
      </ViewerLink>

      <ItemAlternateViews
        iiifManifest={iiifManifest}
        location={location}
        viewer={viewer}
      />
    </section>
  )
}

ManifestImageGroup.propTypes = {
  iiifManifest: PropTypes.shape({
    id: PropTypes.string.isRequired,
    summary: PropTypes.object,
    slug: PropTypes.string.isRequired,
  }),
  location: PropTypes.object.isRequired,
  viewer: PropTypes.string,
}

ManifestImageGroup.defaultProps = {
  viewer: 'mirador',
}
export default ManifestImageGroup
