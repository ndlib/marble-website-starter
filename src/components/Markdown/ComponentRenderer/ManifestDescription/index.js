import React from 'react'
import PropTypes from 'prop-types'
import MarkdownHtmlContent from '../MarkdownHtmlContent'

const ManifestDescription = ({ iiifManifest }) => {
  return (
    <MarkdownHtmlContent html={iiifManifest.description || null} />
  )
}

ManifestDescription.propTypes = {
  iiifManifest: PropTypes.shape(
    { description: PropTypes.string }
  ).isRequired,
}

export default ManifestDescription
