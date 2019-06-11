import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
const position = [51.505, -0.09]

const MapPage = ({ location }) => (
  <Layout location={location}>
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>
  </Layout>
)

MapPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default MapPage
