import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'

const MarkDownField = ({ metadata, skipHtml }) => {
  const { label, value } = metadata
  return (
    <React.Fragment>
      <dt>{label.en}</dt>
      {
        value.en.map(val => {
          return (
            <dd key={value}>
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

MarkDownField.propTypes = {
  metadata: PropTypes.shape({
    label: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
  }).isRequired,
  skipHtml: PropTypes.bool,
}

MarkDownField.defaultProps = {
  skipHtml: false,
}

export default MarkDownField
