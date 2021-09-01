/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import sx from '../../../sx.js'

export const ToggleButton = ({ option, action, active }) => {
  return (
    <label htmlFor={option.display}>
      <input
        type='image'
        id={option.display}
        src={active ? option.activeIcon : option.inactiveIcon}
        alt={`${option.display} view`}
        onClick={() => {
          action(option)
        }}
        sx={active ? sx.cardGroup.toggleButton.active : sx.cardGroup.toggleButton.inactive}
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
