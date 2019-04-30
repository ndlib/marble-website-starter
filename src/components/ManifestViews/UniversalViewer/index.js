import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import UniversalViewerLayout from './UniversalViewerLayout'

// The location prop is only available from Gatsby in components inside the 'page' and 'template' directories and must be passed down.
export const UniversalViewer = ({ manifest, location }) => {
  return (
    <StaticQuery
      query={graphql`
      query {
        site {
          siteMetadata {
            universalViewerBaseURL
          }
        }
      }
    `
      }
      render={data => (
        <UniversalViewerLayout
          data={data}
          manifest={manifest}
          location={location}
        />
      )}
    />
  )
}

UniversalViewer.propTypes = {
  location: PropTypes.object.isRequired,
  manifest: PropTypes.string,
}

export default UniversalViewer
