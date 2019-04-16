import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import UniversalViewerLayout from './UniversalViewerLayout'

export const UniversalViewer = ({ manifest }) => {
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
        />
      )}
    />
  )
}

UniversalViewer.propTypes = {
  manifest: PropTypes.string,
}

export default UniversalViewer
