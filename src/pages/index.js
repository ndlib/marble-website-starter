import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
import Home from 'components/Home'

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <SEO title='Marble Digital Collections' />
    <Home />
  </Layout>
)

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default IndexPage
