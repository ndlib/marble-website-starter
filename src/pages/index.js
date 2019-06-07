import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Home from 'components/Home'

const IndexPage = ({ data, location }) => (
  <Home title={data.site.siteMetadata.title} location={location} />
)

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
