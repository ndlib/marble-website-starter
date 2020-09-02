import React from 'react'
import PropTypes from 'prop-types'
import MetaDataLabel from './MetaDataLabel'
import MetaDataValue from './MetaDataValue'
import MetaDataSearchValue from './MetaDataSearchValue'

const MetaDataField = ({ metadata, skipHtml }) => {
  const { label, urlField, type } = metadata
  let { value } = metadata

  let MetadataValueComponent = MetaDataValue
  if (type === 'searchList') {
    MetadataValueComponent = MetaDataSearchValue
  }
  if (!Array.isArray(value)) {
    value = [value]
  }

  if (value.length !== 0) {
    console.log(label, value)
    return (
      <div>
        <MetaDataLabel
          labels={[label]}
        />
        <MetadataValueComponent
          values={value}
          urlField={urlField}
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
    urlField: PropTypes.string,
  }).isRequired,
  skipHtml: PropTypes.bool,
}

MetaDataField.defaultProps = {
  skipHtml: false,
}

export default MetaDataField
