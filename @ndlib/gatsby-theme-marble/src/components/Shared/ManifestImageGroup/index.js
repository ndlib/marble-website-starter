import React from 'react'
import PropTypes from 'prop-types'
import ManifestImage from 'components/Shared/ManifestImage'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import style from './style.module.css'
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
        className={style.link}
        viewer={viewer}
        location={location}
      >
        <ManifestImage
          iiifManifest={iiifManifest}
          index={0}
          alt={iiifManifest.summary}
          className={style.bigImage}
          title={label}
        />
        <ExpandIcon label={label} />
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
    summary: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }),
  location: PropTypes.object.isRequired,
  viewer: PropTypes.string,
}

ManifestImageGroup.defaultProps = {
  viewer: 'mirador',
}
export default ManifestImageGroup
