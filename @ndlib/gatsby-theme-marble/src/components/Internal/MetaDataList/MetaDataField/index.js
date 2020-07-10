import React from 'react'
import PropTypes from 'prop-types'
import MetaDataLabel from './MetaDataLabel'
import MetaDataValue from './MetaDataValue'

const MetaDataField = ({ metadata, skipHtml }) => {
  const { label, value } = metadata
  if (label || value) {
    return (
      <div>
        <MetaDataLabel
          labels={[label]}
        />
        <MetaDataValue
          values={value}
          skipHtml={skipHtml}
        />
      </div>
    )
  }
  return null
}

MetaDataField.propTypes = {
  metadata: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
  }).isRequired,
  skipHtml: PropTypes.bool,
}

MetaDataField.defaultProps = {
  skipHtml: false,
}

export default MetaDataField
