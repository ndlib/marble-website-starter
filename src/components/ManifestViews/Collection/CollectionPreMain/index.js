import React from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/Seo'
import Breadcrumb from 'components/Shared/Breadcrumb'

// TODO: DON'T USE THUMBNAIL
import Thumbnail from 'components/Shared/Thumbnail'

export const CollectionPreMain = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <SEO
        title={iiifManifest.label}
        image={iiifManifest.thumbnail._id}
        description={iiifManifest.description}
      />
      <Thumbnail src={iiifManifest.thumbnail} />
      <Breadcrumb title={iiifManifest.label} />
    </React.Fragment>

  )
}

CollectionPreMain.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}
export default CollectionPreMain
