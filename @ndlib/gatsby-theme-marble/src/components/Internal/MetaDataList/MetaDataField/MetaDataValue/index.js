import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'
import { Styled } from 'theme-ui'

const MetaDataValue = ({ values, skipHtml }) => {
  return (
    <>
      {
        values.map(val => {
          return (
            <dd key={val}>
              <ReactMarkdown
                source={val}
                escapeHtml={false}
                skipHtml={skipHtml}
                renderers={{ link: Styled.a }}
              />
            </dd>
          )
        })
      }
    </>
  )
}

MetaDataValue.propTypes = {
  values: PropTypes.array,
  skipHtml: PropTypes.bool,
}

MetaDataValue.defaultProps = {
  skipHtml: false,
}
export default MetaDataValue
