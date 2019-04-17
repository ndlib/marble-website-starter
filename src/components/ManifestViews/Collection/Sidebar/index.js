import React from 'react'
import PropTypes from 'prop-types'
import ManifestLink from 'components/Shared/ManifestLink'
import MetaDataList from 'components/Shared/MetaDataList'

const CollectionSidebar = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <p>{iiifManifest.description}</p>
      <MetaDataList metadata={iiifManifest.metadata} />

      <ManifestLink manifestUrl={iiifManifest.id} />
    </React.Fragment>
  )
}

CollectionSidebar.propTypes = {
  iiifManifest: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    metadata: PropTypes.array,
  }).isRequired,
}
export default CollectionSidebar
