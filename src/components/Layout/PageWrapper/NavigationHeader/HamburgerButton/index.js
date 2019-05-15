import React from 'react'
import PropTypes from 'prop-types'
import hamburgerIcon from 'assets/icons/svg/baseline-menu-24px-white.svg'

const HamburgerButton = ({ onClick, onBlur, className }) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      onBlur={(e) => onBlur(e)}
    >
      <img
        src={hamburgerIcon}
        alt='Show Menu'
        className={className}
      />
    </button>
  )
}

HamburgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}
export default HamburgerButton
