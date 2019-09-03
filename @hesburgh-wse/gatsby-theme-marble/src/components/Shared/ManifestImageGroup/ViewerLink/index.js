import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import buildReferalState from 'utils/buildReferalState'

const ViewerLink = ({ iiifManifest, index, viewer, className, view, location, children }) => {
  let viewerLink = `/${iiifManifest.slug}/mirador?cv=${index}&view=${view}`
  if (viewer === 'uv') {
    viewerLink = `/viewer?manifest=${encodeURIComponent(iiifManifest.id)}&cv=${index}`
  }
  return (
    <Link
      to={viewerLink}
      className={className}
      state={buildReferalState(location, { type: 'item', backLink: location.href })}
      rel={index > 0 ? 'nofollow' : 'alternate'}
    >
      {children}
    </Link>
  )
}

ViewerLink.propTypes = {
  iiifManifest: PropTypes.shape({
    id: PropTypes.string.isRequired,
    summary: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }),
  index: PropTypes.number,
  className: PropTypes.string,
  location: PropTypes.object.isRequired,
  view: PropTypes.string,
  viewer: PropTypes.string,
  children: PropTypes.node,
}
ViewerLink.defaultProps = {
  index: 0,
  view: 'default',
}

export default ViewerLink
