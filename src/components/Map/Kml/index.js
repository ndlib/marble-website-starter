import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Map from 'components/Map'
const { KmlLayer } = require('react-google-maps')


// http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml
const KmlMap = ({ map }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            gooleMapApiURL
          }          
        }
      }
    `
  )
  console.log(site)

  const key = ''
  if (!map) {
    return null
  }

  const { center, kmlFile, defaultZoom } = map
  if (!kmlFile) {
    return null
  }

  return (
    <Map
      googleMapURL={site.siteMetadata.gooleMapApiURL}
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
  map: PropTypes.object,
}

export default KmlMap
