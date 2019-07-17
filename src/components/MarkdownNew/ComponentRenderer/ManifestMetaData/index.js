import React from 'react'
import { PropTypes } from 'prop-types'
import MetaDataList from 'components/Shared/MetaDataList'

const ManifestMetaData = ({ iiifManifest, skipHtml }) => {
  return (
    <React.Fragment>
      <h2 className='accessibilityOnly'>Metadata</h2>
      <MetaDataList
        metadata={iiifManifest.metadata}
        skipHtml={skipHtml}
      />
      { iiifManifest.attribution ? <p>{iiifManifest.attribution}</p> : null }
      { iiifManifest.license ? <p dangerouslySetInnerHTML={{ __html: iiifManifest.license }} /> : null}
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
