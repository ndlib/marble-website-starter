import React from 'react'
import PropTypes from 'prop-types'

const DownloadModalContent = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <p>Download Tools for <code>{ iiifManifest.slug }</code>.</p>
    </React.Fragment>
  )
}

DownloadModalContent.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}
export default DownloadModalContent
