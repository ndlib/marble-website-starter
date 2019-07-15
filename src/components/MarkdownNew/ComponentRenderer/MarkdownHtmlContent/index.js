import React from 'react'
import PropTypes from 'prop-types'

const MarkdownHtmlContent = ({ html }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

MarkdownHtmlContent.propTypes = {
  html: PropTypes.string,
}
export default MarkdownHtmlContent
