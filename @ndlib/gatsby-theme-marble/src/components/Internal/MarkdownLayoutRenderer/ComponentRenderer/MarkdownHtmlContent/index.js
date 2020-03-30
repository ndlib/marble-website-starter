import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'
import { BaseStyles } from 'theme-ui'
import style from './style.module.css'
const MarkdownHtmlContent = ({ html }) => {
  if (!html) {
    return null
  }

  return (
    <BaseStyles>
      <ReactMarkdown
        source={html}
        escapeHtml={false}
        className={style.htmlContent}
      />
    </BaseStyles>
  )
}

MarkdownHtmlContent.propTypes = {
  html: PropTypes.string,
}
export default MarkdownHtmlContent
