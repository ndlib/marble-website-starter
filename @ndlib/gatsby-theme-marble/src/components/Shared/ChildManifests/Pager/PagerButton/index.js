/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const PagerButton = ({
  isActive = false,
  isDisabled = false,
  onClick = () => {},
  label = '...',
}) => {
  return (
    <div
      className={`sk-toggle-option sk-toggle__item ${setIsActive(isActive)} ${setIsDisabled(isDisabled)}`}
      onClick={onClick}
      role='button'
    >
      <div className='sk-toggle-option__text'>{label}</div>
    </div>
  )
}

PagerButton.propTypes = {
  isActive: PropTypes.string,
  isDisabled: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default PagerButton

export const setIsActive = (bool) => {
  return bool ? 'is-active' : ''
}
export const setIsDisabled = (bool) => {
  return bool ? 'is-disabled' : ''
}
