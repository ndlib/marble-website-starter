import React from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

const Map = withScriptjs(withGoogleMap(({ center, children, defaultZoom }) => {
  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={center}
    >
      {children}
    </GoogleMap>
  )
}
))
Map.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Map
