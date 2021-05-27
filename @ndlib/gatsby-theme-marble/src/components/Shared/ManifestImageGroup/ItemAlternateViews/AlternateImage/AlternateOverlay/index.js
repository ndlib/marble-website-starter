import React from 'react'
import PropTypes from 'prop-types'
import * as style from './style.module.css'

const AlternateOverlay = ({ isLast, overlayNumber }) => {
  // index starts at 1, since we are already showing the first image above this
  // only render on last instance
  // do not render if total shown equals total available
  if (isLast) {
    return (
      <div className={style.alternateOverlay} title='See all images.'><span>{`+${overlayNumber}`}</span></div>
    )
  }
  return null
}
AlternateOverlay.propTypes = {
  isLast: PropTypes.bool.isRequired,
  overlayNumber: PropTypes.number.isRequired,
}
export default AlternateOverlay
