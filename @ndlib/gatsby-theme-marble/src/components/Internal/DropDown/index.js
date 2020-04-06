/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const DropDown = ({ sxStyle, buttonLabel, options }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className='wrapper'
      sx={sxStyle.wrapper}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false)
        }
      }}
    >
      <button
        className='dropdown-toggle'
        onClick={() => setOpen(!open)}
        sx={sxStyle.toggle}
      >
        { buttonLabel }
      </button>
      <div
        role='listbox'
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
  options: PropTypes.node.isRequired,
}

export default DropDown
