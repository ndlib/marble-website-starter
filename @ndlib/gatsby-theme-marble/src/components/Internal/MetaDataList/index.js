import React from 'react'
import { PropTypes } from 'prop-types'
import MetaDataField from './MetaDataField'
const MetaDataList = ({ metadata, className, skipHtml }) => {
  const mdSkipList = ['URI Value']
  let mdReturn
  if (metadata) {
    return (
      <dl className={className}>
        {
          metadata.map((md, index) => {
            mdReturn = mdSkipList.includes(md.label) ? (
              null) : (
              <MetaDataField
                metadata={md}
                skipHtml={skipHtml}
                key={index}
              />
            )
            return mdReturn
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
