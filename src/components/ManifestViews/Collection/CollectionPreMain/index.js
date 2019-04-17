import React from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/seo'
import Breadcrumb from 'components/Shared/Breadcrumb'
// import style from './style.module.css'

// TODO: DON'T USE THUMBNAIL
import Thumbnail from 'components/Shared/Thumbnail'

export const CollectionPreMain = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <SEO title={iiifManifest.label} description={iiifManifest.description} />
      <Thumbnail src={iiifManifest.thumbnail} />
      <Breadcrumb />
    </React.Fragment>

  )
}

CollectionPreMain.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}
export default CollectionPreMain
