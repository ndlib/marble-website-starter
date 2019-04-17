import React from 'react'
import PropTypes from 'prop-types'

export const DisplayViewToggle = ({ children }) => {
  return (
    <div classame='placeholder-for-toggle-class'>
      <div>Display View Toggle Buttons</div>
      {children}
    </div>
  )
}

DisplayViewToggle.propTypes = {
  children: PropTypes.node.isRequired,
}
export default DisplayViewToggle
