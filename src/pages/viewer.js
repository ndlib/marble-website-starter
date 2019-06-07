import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import UniversalViewer from 'components/ManifestViews/UniversalViewer'

export const ViewerPage = ({ data, location }) => {
  return (
    <UniversalViewer data={data} location={location} />
  )
}

ViewerPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default ViewerPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        universalViewerBaseURL
      }
    }
  }
`
