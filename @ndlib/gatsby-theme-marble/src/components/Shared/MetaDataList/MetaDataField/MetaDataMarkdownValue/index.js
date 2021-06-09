import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { BaseStyles } from 'theme-ui'

const MetaDataMarkdownValue = ({ values, skipHtml }) => {
  return (
    <>
      {
        values.map(val => {
          return (
            <dd key={val}>
              <ReactMarkdown
                escapeHtml={false}
                skipHtml={skipHtml}
              >{val}</ReactMarkdown>
            </dd>
          )
        })
      }
    </>
  )
}

MetaDataMarkdownValue.propTypes = {
  values: PropTypes.array,
  skipHtml: PropTypes.bool,
}

MetaDataMarkdownValue.defaultProps = {
  skipHtml: false,
}
export default MetaDataMarkdownValue
