import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
export const ToggleButton = ({ icon, option, action, active }) => {
  return (
    <input
      type='image'
      src={icon}
      className={active ? style.selected : style.notSelected}
      alt={`${option} view`}
      onClick={() => {
        console.log(option)
        action(option)
      }}
    />
  )
}

ToggleButton.propTypes = {
  icon: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  active: PropTypes.bool,
}

export default ToggleButton
