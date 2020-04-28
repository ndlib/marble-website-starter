import React from 'react'
import PropTypes from 'prop-types'

const CampusLocation = ({ metadata }) => {
  return (
    <React.Fragment>
      <dl>
        <dt key='CampusLocation'>Campus Location</dt>
        <dd key={metadata}>{metadata}</dd>
      </dl>
    </React.Fragment>
  )
}
CampusLocation.propTypes = {
  metadata: PropTypes.string,
}

export default CampusLocation
