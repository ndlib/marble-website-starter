import React from 'react'
import { PropTypes } from 'prop-types'
import MetaDataList from 'components/Shared/MetaDataList'

const ManifestMetaData = ({ marbleItem, skipHtml }) => {
  if (!marbleItem) {
    return null
  }
  return (
    <>
      <h2 className='accessibilityOnly'>Metadata</h2>
      <MetaDataList
        metadata={marbleItem.metadata}
        skipHtml={skipHtml}
      />
    </>
  )
}
ManifestMetaData.propTypes = {
  marbleItem: PropTypes.object.isRequired,
  skipHtml: PropTypes.bool,
}

ManifestMetaData.defaultProps = {
  skipHtml: false,
}

export default ManifestMetaData
