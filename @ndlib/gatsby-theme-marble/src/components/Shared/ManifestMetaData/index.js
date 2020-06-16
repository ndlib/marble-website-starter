import React from 'react'
import { PropTypes } from 'prop-types'
import MetaDataList from 'components/Internal/MetaDataList'
import MetaDataField from 'components/Internal/MetaDataList/MetaDataField'
import CampusLocation from 'components/Internal/CampusLocation'
import typy from 'typy'

const ManifestMetaData = ({ ndJson, skipHtml }) => {
  if (!ndJson) {
    return null
  }
  return (
    <>
      <h2 className='accessibilityOnly'>Metadata</h2>
      <MetaDataList
        metadata={ndJson.metadata}
        skipHtml={skipHtml}
      />
      {
        typy(ndJson, 'provider[0].homepage[0].label.en[0]').isString ? (
          <CampusLocation metadata={typy(ndJson, 'provider[0].homepage[0].label.en[0]').safeString} />
        ) : null
      }
      {
        ndJson.requiredStatement ? (
          <MetaDataField metadata={ndJson.requiredStatement} />
        ) : null
      }
      {
        ndJson.copyrightStatus ? (
          <div>
            <dt>Copyright</dt>
            <dd>{ndJson.copyrightStatus}</dd>
          </div>
        ) : null
      }
    </>
  )
}
ManifestMetaData.propTypes = {
  ndJson: PropTypes.object.isRequired,
  skipHtml: PropTypes.bool,
}

ManifestMetaData.defaultProps = {
  skipHtml: false,
}

export default ManifestMetaData
