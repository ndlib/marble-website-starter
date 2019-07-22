import React from 'react'
import PropTypes from 'prop-types'

const TestComponent = ({ component, children }) => {
  const style = { border: 'solid 1px black', margin: '.5em', padding: '.5em' }
  return (
    <div
      className={component}
      style={style}
    >
      <em>{component}</em>
      <div className={`${component}Children`}>{children}</div>
    </div>
  )
}

TestComponent.propTypes = {
  component: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default TestComponent
