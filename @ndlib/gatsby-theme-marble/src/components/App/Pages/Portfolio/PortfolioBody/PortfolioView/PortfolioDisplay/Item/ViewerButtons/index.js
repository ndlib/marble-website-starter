import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'
import style from '../style.module.css'

const ViewerButtons = ({ link }) => {
  if (link) {
    return (
      <div className={style.viewerButtons}>
        <MaterialButton
          onClick={() => {
            navigate(`${link}/mirador`)
          }}
          wide
        >View in Mirador</MaterialButton>
      </div>
    )
  }
  return null
}

ViewerButtons.propTypes = {
  link: PropTypes.string,
}
export default ViewerButtons
