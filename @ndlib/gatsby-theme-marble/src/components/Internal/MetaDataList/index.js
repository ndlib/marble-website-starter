import React from 'react'
import { PropTypes } from 'prop-types'
import MetaDataField from './MetaDataField'
import './style.module.css'
const MetaDataList = ({ metadata, className, skipHtml }) => {
  if (metadata) {
    return (
      <dl className={className}>
        {
          metadata.map((md, index) => {
            return (
              <MetaDataField
                metadata={md}
                skipHtml={skipHtml}
                key={index}
              />
            )
          })
        }
      </dl>
    )
  }
  return null
}

MetaDataList.propTypes = {
  metadata: PropTypes.array,
  className: PropTypes.string.isRequired,
  skipHtml: PropTypes.bool.isRequired,
}

MetaDataList.defaultProps = {
  className: 'metadataList',
  skipHtml: false,
}
export default MetaDataList
