import React from 'react'
import PropTypes from 'prop-types'
import UniversalViewer from 'components/ManifestViews/UniversalViewer'

export const ViewerPage = ({ location }) => {
  return (
    <UniversalViewer location={location} />
  )
}

ViewerPage.propTypes = {
  location: PropTypes.object,
}

export default ViewerPage
