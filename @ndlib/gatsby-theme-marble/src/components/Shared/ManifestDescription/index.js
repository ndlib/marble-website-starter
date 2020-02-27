import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import getLanguage from 'utils/getLanguage'
import style from './style.module.css'
// import MarkdownHtmlContent from 'components/Internal/MarkdownLayoutRenderer/ComponentRenderer/MarkdownHtmlContent/'

const ManifestDescription = ({ iiifManifest }) => {
  const lang = getLanguage()
  if (!typy(iiifManifest, `summary[${lang}]`).isArray) {
    return null
  }
  return (
    <div className={style.descriptionBlock}>
      {
        iiifManifest.summary[lang].map((content, index) => {
          return (<p key={index}>{content}</p>)
        })
      }
    </div>
  )
}

ManifestDescription.propTypes = {
  iiifManifest: PropTypes.shape(
    { description: PropTypes.string,
      summary: PropTypes.string },
  ),
}

export default ManifestDescription
