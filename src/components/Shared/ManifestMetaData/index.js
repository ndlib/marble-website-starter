import React from 'react'
import { PropTypes } from 'prop-types'
import MetaDataList from 'components/Internal/MetaDataList'
import MetaDataField from 'components/Internal/MetaDataList/MetaDataField'

const ManifestMetaData = ({ iiifManifest, skipHtml }) => {
  return (
    <React.Fragment>
      <h2 className='accessibilityOnly'>Metadata</h2>
      <MetaDataList
        metadata={iiifManifest.metadata}
        skipHtml={skipHtml}
      />
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
