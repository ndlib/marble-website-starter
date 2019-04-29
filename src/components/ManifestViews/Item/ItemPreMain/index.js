import React from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/Seo'
import Breadcrumb from 'components/Shared/Breadcrumb'
export const ItemPreMain = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <SEO
        title={iiifManifest.label}
        image={iiifManifest.thumbnail._id}
        description={iiifManifest.description}
      />
      <Breadcrumb />
    </React.Fragment>
  )
}
ItemPreMain.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default ItemPreMain
