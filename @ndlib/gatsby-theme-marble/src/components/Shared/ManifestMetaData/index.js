import React from 'react'
import { PropTypes } from 'prop-types'
import MetaDataList from 'components/Internal/MetaDataList'
import MetaDataField from 'components/Internal/MetaDataList/MetaDataField'
import CampusLocation from 'components/Internal/CampusLocation'

const ManifestMetaData = ({ iiifManifest, skipHtml }) => {
  if (!iiifManifest) {
    return null
  }
  return (
    <React.Fragment>
      <h2 className='accessibilityOnly'>Metadata</h2>
      <MetaDataList
        metadata={iiifManifest.metadata}
        skipHtml={skipHtml}
      />
      { iiifManifest.provider.homepage[0].label ? <CampusLocation metadata={iiifManifest.provider.homepage[0].label.en} /> : null }
      { iiifManifest.requiredStatement ? <MetaDataField metadata={iiifManifest.requiredStatement} /> : null }
      { iiifManifest.rights ? <p dangerouslySetInnerHTML={{ __html: iiifManifest.rights }} /> : null}
    </React.Fragment>
  )
}
ManifestMetaData.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  skipHtml: PropTypes.bool,
}

ManifestMetaData.defaultProps = {
  skipHtml: false,
}

export default ManifestMetaData
