import React from 'react'
import PropTypes from 'prop-types'
import ImageSection from './ImageSection'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'

export const ItemAside = ({ location, iiifManifest }) => {
  return (
    <React.Fragment>
      <ActionButtonGroup iiifManifest={iiifManifest} />
      <ImageSection iiifManifest={iiifManifest} location={location} />
    </React.Fragment>
  )
}
ItemAside.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default ItemAside
