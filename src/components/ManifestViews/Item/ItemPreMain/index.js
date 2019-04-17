import React from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/seo'
import Breadcrumb from 'components/Shared/Breadcrumb'

export const ItemPreMain = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <SEO title={iiifManifest.label} description={iiifManifest.description} />
      <Breadcrumb />
    </React.Fragment>
  )
}
ItemPreMain.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default ItemPreMain
