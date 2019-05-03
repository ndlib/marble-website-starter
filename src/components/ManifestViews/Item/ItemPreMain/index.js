import React from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/Seo'
import Breadcrumb from 'components/Shared/Breadcrumb'
export const ItemPreMain = ({ iiifManifest, location }) => {
  return (
    <React.Fragment>
      <SEO
        title={iiifManifest.label}
        image={iiifManifest.thumbnail._id}
        description={iiifManifest.description}
      />
      <Breadcrumb location={location} />
    </React.Fragment>
  )
}
ItemPreMain.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default ItemPreMain
