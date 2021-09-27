/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Button } from 'theme-ui'

const DropDown = ({ sxStyle, sxTiny, buttonLabel, buttonText, options }) => {
  const [open, setOpen] = useState(false)
  const toggleStyle = sxTiny ? sxStyle.tiny : sxStyle.toggle
  const wrapperStyle = sxTiny ? sxStyle.tinyWrapper : sxStyle.wrapper

  return (
    <div
      className='wrapper'
      sx={wrapperStyle}
      type='button'
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false)
        }
      }}
    >
      <Button
        variant='primary'
        className='dropdown-toggle'
        aria-label='Save to a Portfolio'
        type='button'
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault()
          setOpen(!open)
        }}
        title={buttonText}
        sx={toggleStyle}
      >
        { buttonLabel }
      </Button>
      <div
        sx={open ? sxStyle.optionsOpen : sxStyle.optionsClosed}>
        { options }
      </div>
    </div>

  )
}

DropDown.propTypes = {
  sxStyle: PropTypes.shape({
    wrapper: PropTypes.object.isRequired,
    toggle: PropTypes.object.isRequired,
    optionsOpen: PropTypes.object.isRequired,
    optionsClosed: PropTypes.object.isRequired,
  }).isRequired,
  buttonLabel: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  options: PropTypes.node.isRequired,
  sxTiny: PropTypes.bool,
}

export default DropDown
