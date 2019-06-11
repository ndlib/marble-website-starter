import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
import Map from 'components/Map'

const MapPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{ lat: 25.03, lng: 121.6 }}
      />
    </Layout>
  )
}

MapPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default MapPage
