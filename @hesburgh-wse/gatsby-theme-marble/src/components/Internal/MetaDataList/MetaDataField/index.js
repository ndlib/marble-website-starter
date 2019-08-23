import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import MetaDataLabel from './MetaDataLabel'
import MetaDataValue from './MetaDataValue'
import getLanguage from 'utils/getLanguage'

const MetaDataField = ({ metadata, skipHtml }) => {
  const { label, value } = metadata
  const lang = getLanguage()
  return (
    <div>
      <MetaDataLabel
        labels={typy(label, `[${lang}]`).safeArray}
      />
      <MetaDataValue
        values={typy(value, `[${lang}]`).safeArray}
        skipHtml={skipHtml}
      />
    </div>
  )
}

MetaDataField.propTypes = {
  metadata: PropTypes.shape({
    label: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
  }).isRequired,
  skipHtml: PropTypes.bool,
}

MetaDataField.defaultProps = {
  skipHtml: false,
}

export default MetaDataField
