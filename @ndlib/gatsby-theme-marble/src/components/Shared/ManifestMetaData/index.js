import React from 'react'
import { PropTypes } from 'prop-types'
import MetaDataList from 'components/Internal/MetaDataList'
// import MetaDataField from 'components/Internal/MetaDataList/MetaDataField'
// import CampusLocation from 'components/Internal/CampusLocation'
import typy from 'typy'

const ManifestMetaData = ({ marbleItem, skipHtml }) => {
  console.log(marbleItem.metadata)
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
      {
        // Campus Location
        // Required Statement
        // Copyright Status
      }
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
