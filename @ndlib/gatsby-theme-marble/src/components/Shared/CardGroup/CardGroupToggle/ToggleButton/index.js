/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

export const ToggleButton = ({ option, action, active }) => {
  return (
    <label htmlFor={option.display}>
      <input
        type='image'
        src={active ? option.activeIcon : option.inactiveIcon}
        alt={`${option.display} view`}
        onClick={() => {
          action(option)
        }}
        sx={active ? {
          backgroundColor: 'primary',
          cursor: 'default',
        } : {
          backgroundColor:'#dedede',
          opacity: '.3',
        }}
      />
    </label>
  )
}

ToggleButton.propTypes = {
  option: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  active: PropTypes.bool,
}

export default ToggleButton
