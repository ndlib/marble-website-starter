import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'

const MetaDataValue = ({ values, skipHtml }) => {
  return (
    <React.Fragment>
      {
        values.map(val => {
          return (
            <dd key={val}>
              <ReactMarkdown
                source={val}
                escapeHtml={false}
                skipHtml={skipHtml}
              />
            </dd>
          )
        })
      }
    </React.Fragment>
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
