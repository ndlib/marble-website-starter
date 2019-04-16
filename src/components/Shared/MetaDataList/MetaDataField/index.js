import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'

const MarkDownField = ({ metadata, skipHtml }) => {
  const { label, value } = metadata
  return (
    <React.Fragment>
      <dt>{label}</dt>
      <dd>
        <ReactMarkdown
          source={value}
          escapeHtml={false}
          skipHtml={skipHtml}
        />
      </dd>
    </React.Fragment>
  )
}

MarkDownField.propTypes = {
  metadata: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  skipHtml: PropTypes.bool,
}

MarkDownField.defaultProps = {
  skipHtml: false,
}

export default MarkDownField
