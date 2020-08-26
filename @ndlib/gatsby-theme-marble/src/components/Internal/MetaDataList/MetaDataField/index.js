import React from 'react'
import PropTypes from 'prop-types'
import MetaDataLabel from './MetaDataLabel'
import MetaDataValue from './MetaDataValue'
import MetaDataSearchValue from './MetaDataSearchValue'

const MetaDataField = ({ metadata, skipHtml }) => {
  const { label, value, type } = metadata

  let MetadataValueComponent = MetaDataValue
  if (type === 'searchList') {
    MetadataValueComponent = MetaDataSearchValue
  }

  if (label || value) {
    return (
      <div>
        <MetaDataLabel
          labels={[label]}
        />
        <MetadataValueComponent
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
    type:  PropTypes.string.isRequired,
  }).isRequired,
  skipHtml: PropTypes.bool,
}

MetaDataField.defaultProps = {
  skipHtml: false,
}

export default MetaDataField
