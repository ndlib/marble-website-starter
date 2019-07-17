import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
const MarkdownHtmlContent = ({ html }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={style.htmlContent}
    />
  )
}

MarkdownHtmlContent.propTypes = {
  html: PropTypes.string,
}
export default MarkdownHtmlContent
