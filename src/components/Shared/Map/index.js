import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import MapWrapper from './MapWrapper'
const { KmlLayer } = require('react-google-maps')

// http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml
const Map = ({
  lat,
  lng,
  defaultZoom,
  kmlFile,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            googleMapApiURL
            siteUrl
          }
        }
      }
    `
  )

  if (!kmlFile) {
    console.warn('No KML file.')
    return null
  }
  const { siteUrl, googleMapApiURL } = site.siteMetadata
  return (
    <MapWrapper
      googleMapURL={googleMapApiURL}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `600px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      center={{
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      }}
      defaultZoom={parseInt(defaultZoom, 10)}
    >
      <KmlLayer
        url={kmlFile}
        // url={`${siteUrl}${kmlFile}`}
        options={{ preserveViewport: true }}
      />
    </MapWrapper>
  )
}

Map.propTypes = {
  lat: PropTypes.string,
  lng: PropTypes.string,
  defaultZoom: PropTypes.string,
  kmlFile: PropTypes.string,
}

export default Map
