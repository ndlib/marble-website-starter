import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const AlternateOverlay = ({ index, max, length }) => {
  // index starts at 1, since we are already showing the first image above this
  // only render on last instance
  // do not render if total shown equals total available
  if (max === index && max + 1 !== length) {
    const overlayNumber = length - max
    return (
      <div className={style.alternateOverlay} title='See all images in Universal Viewer.'><span>{`+${overlayNumber}`}</span></div>
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
