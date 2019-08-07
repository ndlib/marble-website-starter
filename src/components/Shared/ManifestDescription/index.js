import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import getLanguage from 'utils/getLanguage'
import MarkdownHtmlContent from '../../../../plugins/gatsby-remark-react-components/MarkdownLayoutRenderer/ComponentRenderer/MarkdownHtmlContent/'

const ManifestDescription = ({ iiifManifest }) => {
  const lang = getLanguage()
  if (!typy(iiifManifest, `summary[${lang}]`).isArray) {
    return null
  }
  return (
    <React.Fragment>
      {
        iiifManifest.summary[lang].map((content, index) => {
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
