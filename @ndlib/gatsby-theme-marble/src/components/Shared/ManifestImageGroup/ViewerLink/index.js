/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import buildReferalState from 'utils/buildReferalState'
import { jsx } from 'theme-ui'

const ViewerLink = ({ marbleItem, index, viewer, className, view, location, children }) => {
  let viewerLink = `${marbleItem.slug}/mirador?cv=${index}&view=${view}`
  if (viewer === 'uv') {
    viewerLink = `/viewer?manifest=${encodeURIComponent(marbleItem.iiifUri)}&cv=${index}`
  }
  return (
    <Link
      to={viewerLink}
      className={className}
      state={buildReferalState(location, { type: 'item', backLink: location.href })}
      rel={index > 0 ? 'nofollow' : 'alternate'}
      sx={{
        color: 'background',
        display: 'block',
        position: 'relative',
        verticalAlign: 'top',
      }}
    >
      {children}
    </Link>
  )
}

ViewerLink.propTypes = {
  marbleItem: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    iiifUri: PropTypes.string.isRequired,
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
