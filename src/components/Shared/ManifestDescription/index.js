import React from 'react'
import PropTypes from 'prop-types'
import MarkdownHtmlContent from '../../../../plugins/gatsby-remark-react-components/MarkdownLayoutRenderer/ComponentRenderer/MarkdownHtmlContent/'

const ManifestDescription = ({ iiifManifest }) => {
  return (
    <MarkdownHtmlContent html={iiifManifest.description || null} />
  )
}

ManifestDescription.propTypes = {
  iiifManifest: PropTypes.shape(
    { description: PropTypes.string }
  ),
}

export default ManifestDescription
