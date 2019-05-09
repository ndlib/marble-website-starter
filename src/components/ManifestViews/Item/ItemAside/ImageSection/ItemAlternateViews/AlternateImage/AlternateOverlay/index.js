import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const AlternateOverlay = ({ index, max, length }) => {
  // only render on last instance
  // do not render if total shown equals total available
  if (max === index + 1 && max !== length) {
    const overlayNumber = length - max
    return (
      <div className={style.alternateOverlay}><span>{`+${overlayNumber}`}</span></div>
    )
  }
  return null
}
AlternateOverlay.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
}
export default AlternateOverlay
