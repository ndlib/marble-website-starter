import React from 'react'
import PropTypes from 'prop-types'
import ImageSection from './ImageSection'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'

export const ItemAside = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <ImageSection iiifManifest={iiifManifest} />
      <ActionButtonGroup iiifManifest={iiifManifest} />
    </React.Fragment>
  )
}
ItemAside.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default ItemAside
