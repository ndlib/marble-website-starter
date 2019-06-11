import React from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, KmlLayer } from "react-google-maps"
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const Map = withScriptjs(withGoogleMap(({ location, center }) => {
  return (
    <div>

    <GoogleMap
      defaultZoom={9}
      defaultCenter={{ lat: 41.9, lng: -87.624 }}
    >
      <KmlLayer
        url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
        options={{ preserveViewport: true }}
      />
    </GoogleMap>
    </div>
  )
}
))
Map.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Map
