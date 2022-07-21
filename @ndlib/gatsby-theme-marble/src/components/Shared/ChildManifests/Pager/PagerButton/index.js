/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const PagerButton = ({
  isActive = '',
  isDisabled = '',
  onClick = () => {},
  label = '...',
}) => {
  return (
    <div
      className={`sk-toggle-option sk-toggle__item ${isActive} ${isDisabled}`}
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

export const isActive = (index, length, start) => {
  return (index - 1) * length === start ? 'is-active' : ''
}
export const isDisabled = (bool) => {
  return bool ? 'is-disabled' : ''
}
