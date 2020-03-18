import React from 'react'
import PropTypes from 'prop-types'

const CampusLocation = ({ metadata }) => {
  return (
    <React.Fragment>
      <dt key='CampusLocation'>Campus Location</dt>
      <dd key={metadata}>{metadata}</dd>
    </React.Fragment>
  )
}
CampusLocation.propTypes = {
  iiifManifest: PropTypes.shape({
    provider: PropTypes.object,
  }),
}

export default CampusLocation
