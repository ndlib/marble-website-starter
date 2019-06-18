import React from 'react'
import PropTypes from 'prop-types'
import ManifestSEO from 'components/ManifestViews/ManifestSEO'
import ReturnToSearch from 'components/Shared/ReturnToSearch'
export const ItemPreMain = ({ iiifManifest, location }) => {
  return (
    <React.Fragment>
      <ManifestSEO
        iiifManifest={iiifManifest}
        location={location}
      />
      <ReturnToSearch location={location} />
    </React.Fragment>
  )
}
ItemPreMain.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default ItemPreMain
