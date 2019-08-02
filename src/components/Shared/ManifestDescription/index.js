import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import MarkdownHtmlContent from '../../../../plugins/gatsby-remark-react-components/MarkdownLayoutRenderer/ComponentRenderer/MarkdownHtmlContent/'

const ManifestDescription = ({ iiifManifest }) => {
  if (!typy(iiifManifest, `summary.en`).isArray) {
    return null
  }
  return (
    <React.Fragment>
      {
        iiifManifest.summary.en.map((content, index) => {
          return <MarkdownHtmlContent
            key={index}
            html={content}
          />
        })
      }
    </React.Fragment>

  )
}

ManifestDescription.propTypes = {
  iiifManifest: PropTypes.shape(
    { description: PropTypes.string }
  ),
}

export default ManifestDescription
