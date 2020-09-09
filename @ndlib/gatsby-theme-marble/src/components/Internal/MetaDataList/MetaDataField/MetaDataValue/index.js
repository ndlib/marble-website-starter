import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'
import { BaseStyles } from 'theme-ui'

const MetaDataValue = ({ values, skipHtml }) => {
  return (
    <>
      {
        values.map(val => {
          return (
            <dd key={val}>
              <BaseStyles>
                <ReactMarkdown
                  source={val}
                  escapeHtml={false}
                  skipHtml={skipHtml}
                />
              </BaseStyles>
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
