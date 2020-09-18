import React from 'react'
import PropTypes from 'prop-types'
import MetaDataLabel from './MetaDataLabel'
import MetaDataValue from './MetaDataValue'
import MetaDataSearchValue from './MetaDataSearchValue'
import MetaDataMarkdownValue from './MetaDataMarkdownValue'

const MetaDataField = ({ metadata, skipHtml }) => {
  const { label, urlField, type } = metadata
  let { value } = metadata
  if (!Array.isArray(value) && value) {
    value = [value]
  }

  const MetadataValueComponent = getComponent(type)

  if (value && value.length !== 0) {
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

const getComponent = (type) => {
  if (type === 'searchList') {
    return MetaDataSearchValue
  } else if (type === 'markdown') {
    return MetaDataMarkdownValue
  }

  return MetaDataValue
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
