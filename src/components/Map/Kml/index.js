import React from 'react'
import PropTypes from 'prop-types'
import Map from 'components/Map'
const { KmlLayer } = require("react-google-maps")

// http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml
const KmlMap = ({ center, kmlFile, defaultZoom }) => {
  const key = ''
  return (
    <Map
      googleMapURL={'https://maps.googleapis.com/maps/api/js?key=' + key + '&v=3.exp&libraries=geometry,drawing,places'}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      center={center}
      defaultZoom={defaultZoom}
    >
      <KmlLayer
        url={kmlFile}
        options={{ preserveViewport: true }}
      />
    </Map>
  )
}

KmlMap.propTypes = {
  center: PropTypes.object.isRequired,
  kmlFile: PropTypes.string.isRequired,
  defaultZoom: PropTypes.number.isRequired,
}

export default KmlMap
