import React from 'react'
import PropTypes from 'prop-types'

const Attribution = ({ children }) => {
  return <div style={{
    fontSize: '.75rem',
    fontStyle: 'italic',
    lineHeight: '1.45rem',
    margin: '.5rem 0',
  }}>{children}</div>
}

Attribution.propTypes = {
  children: PropTypes.node,
}

export default Attribution
