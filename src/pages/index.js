import React from 'react'
import PropTypes from 'prop-types'
import Home from 'components/Home'

const IndexPage = ({ location }) => (
  <Home location={location} />
)

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default IndexPage
