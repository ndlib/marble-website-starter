import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'

const NotFoundPage = ({ location }) => (
  <Layout
    preMain={<SEO title='404: Not found' />}
    title='Not Found'
    location={location}
  >
    <p>We're sorry. We seem to have lost a few marbles...</p>
  </Layout>
)

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default NotFoundPage
