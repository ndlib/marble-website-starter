import React from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

const MapWrapper = withScriptjs(withGoogleMap(({ center, children, defaultZoom }) => {
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
MapWrapper.propTypes = {
  location: PropTypes.object,
}

export default MapWrapper
