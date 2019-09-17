import React from 'react'
import PropTypes from 'prop-types'
import MaterialButton from 'components/Internal/MaterialButton'
import style from '../../../style.module.css'

const ViewerButtons = ({ iiifManifest }) => {
  if (iiifManifest) {
    return (
      <div className={style.viewerButtons}>
        <MaterialButton
          onClick={() => {
            console.log('mirador')
          }}
          wide
        >Mirador</MaterialButton>
        <MaterialButton
          onClick={() => {
            console.log('uv')
          }}
          wide
        >Universal Viewer</MaterialButton>
      </div>
    )
  }
  return null
}

ViewerButtons.propTypes = {
  iiifManifest: PropTypes.string,
}
export default ViewerButtons
