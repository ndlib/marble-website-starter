/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import MetaDataLabel from './MetaDataLabel'
import MetaDataValue from './MetaDataValue'
import MetaDataSearchValue from './MetaDataSearchValue'
import MetaDataMarkdownValue from './MetaDataMarkdownValue'
import MetaDataAidValue from './MetaDataAidValue'
import { jsx } from 'theme-ui'
import sx from './sx'

// eslint-disable-next-line complexity
const MetaDataField = ({ metadata, skipHtml }) => {
  const { label, urlField, type } = metadata
  const { t } = useTranslation()
  let { value } = metadata
  if (!Array.isArray(value) && value) {
    value = [value]
  }

  const MetadataValueComponent = getComponent(type, label)
  if (value && value.length !== 0) {
    return (
      <>
        <MetaDataLabel
          labels={[label]}
          styles={sx.dt}
        />
        <MetadataValueComponent
          values={value}
          urlField={urlField}
          skipHtml={skipHtml}
          styles={sx.dd}
        />
      </>
    )
  }
  return null
}

const getComponent = (type, label) => {
  if (type === 'searchList') {
    return MetaDataSearchValue
  } else if (type === 'markdown') {
    if (label === 'Link to Finding Aid' || label === 'Link to Library Catalog') {
      return MetaDataAidValue
    } else {
      return MetaDataMarkdownValue
    }
  }

  return MetaDataValue
}

MetaDataField.propTypes = {
  metadata: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]).isRequired,
    type:  PropTypes.string,
    urlField: PropTypes.string,
  }).isRequired,
  skipHtml: PropTypes.bool,
}

MetaDataField.defaultProps = {
  skipHtml: false,
}

export default MetaDataField
