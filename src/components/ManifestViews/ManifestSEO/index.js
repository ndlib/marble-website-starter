import React from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/Shared/Seo'
import typy from 'typy'

const ManifestSEO = ({ iiifManifest, location }) => {
  return (
    <SEO
      title={iiifManifest.label}
      image={typy(iiifManifest, 'thumbnail.id').safeString}
      description={iiifManifest.description}
      pathname={location.pathname}
    />
  )
}

ManifestSEO.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default ManifestSEO
