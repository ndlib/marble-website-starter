import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

import MaterialButton from 'components/Internal/MaterialButton'
import style from 'components/App/FormElements/style.module.css'

const EditControls = ({ compilation }) => {
  return (
    <p className={style.buttonGroup}>
      <MaterialButton
        onClick={(e) => {
          e.preventDefault()
          if (window.confirm(`Any unsaved changes will be lost.`)) {
            navigate(`/compilation/${compilation.id}/`)
          }
        }}
      >Cancel</MaterialButton>
      <MaterialButton
        onClick={(e) => {
          e.preventDefault()
          console.log('save then navigate')
          navigate(`/compilation/${compilation.id}/`)
        }}
        primary
      >Save</MaterialButton>
    </p>
  )
}

EditControls.propTypes = {
  compilation: PropTypes.object.isRequired,

}

export default EditControls
