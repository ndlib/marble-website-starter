import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const ActionButton = ({ name, action, icon, activeIcon, isActive, altText }) => {
  return (
    <button
      className={`${style.actionButton} ${name}`}
      onClick={() => {
        action()
      }}
    >
      <img
        src={isActive ? activeIcon : icon}
        alt={altText || name}
        title={altText || name}
      />
    </button>
  )
}
ActionButton.propTypes = {
  name: PropTypes.string.isRequired,
  altText: PropTypes.string,
  action: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  activeIcon: PropTypes.string,
  isActive: PropTypes.bool,
}
export default ActionButton
