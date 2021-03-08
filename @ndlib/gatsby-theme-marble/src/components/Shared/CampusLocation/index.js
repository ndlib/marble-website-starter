import React from 'react'
import PropTypes from 'prop-types'

const CampusLocation = ({ metadata }) => {
  return (
    <dl>
      <dt key='CampusLocation'>Campus Location</dt>
      <dd key={metadata}>{metadata}</dd>
    </dl>
  )
}
CampusLocation.propTypes = {
  metadata: PropTypes.string,
}

export default CampusLocation
