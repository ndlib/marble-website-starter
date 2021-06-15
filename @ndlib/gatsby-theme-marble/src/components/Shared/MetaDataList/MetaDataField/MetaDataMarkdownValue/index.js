import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const MetaDataMarkdownValue = ({ values, skipHtml }) => {
  return (
    <>
      {
        values.map(val => {
          return (
            <dd key={val}>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
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
