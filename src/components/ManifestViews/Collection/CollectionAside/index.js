import React from 'react'
import PropTypes from 'prop-types'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import MetaDataList from 'components/Shared/MetaDataList'

const CollectionAside = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <p>{iiifManifest.description}</p>
      <MetaDataList metadata={iiifManifest.metadata} />
      <ActionButtonGroup iiifManifest={iiifManifest} />
    </React.Fragment>
  )
}

CollectionAside.propTypes = {
  iiifManifest: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    metadata: PropTypes.array,
  }).isRequired,
}
export default CollectionAside
