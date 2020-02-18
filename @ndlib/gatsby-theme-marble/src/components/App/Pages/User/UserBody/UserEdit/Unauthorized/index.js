/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'

const Unauthorized = () => {
  const sx = {
    border: '1px solid',
    borderColor: 'gray.1',
    color: 'gray.4',
    margin: '1rem',
    padding: '.5rem',
    textAlign: 'center',
    width: 'calc(100% - 2rem)',
  }

  return (
    <div sx={sx}>
      <p>You are not authorized to view this page.</p>
    </div>
  )
}

export default Unauthorized
