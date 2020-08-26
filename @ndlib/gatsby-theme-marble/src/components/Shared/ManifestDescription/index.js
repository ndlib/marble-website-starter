import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'
import style from './style.module.css'

const ManifestDescription = ({ marbleItem }) => {
  console.log('Desc')
  if (marbleItem && marbleItem.description) {
    marbleItem.description = marbleItem.description.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;')
    return (
      <div className={style.descriptionBlock}>
        <ReactMarkdown
          source={marbleItem.description}
          escapeHtml={false}
        />
      </div>
    )
  }
  return null
}

ManifestDescription.propTypes = {
  marbleItem: PropTypes.shape({
    description: PropTypes.string,
  }),
}

export default ManifestDescription
