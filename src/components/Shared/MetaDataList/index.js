import React from 'react'
import { PropTypes } from 'prop-types'
import MetaDataField from './MetaDataField'
const MetaDataList = ({ metadata, className, skipHtml }) => {
  if (metadata) {
    return (
      <dl className={className}>
        {
          metadata.map((md) => {
            return (
              <MetaDataField
                metadata={md}
                skipHtml={skipHtml}
                key={JSON.stringify(md)}
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
