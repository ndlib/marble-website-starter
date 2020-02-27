/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
const NoItems = () => {
  const sx = {
    border: '1px solid',
    borderColor: 'gray.1',
    color: 'gray.4',
    margin: '2rem auto',
    padding: '2rem .5rem',
    textAlign: 'center',
    maxWidth: '800px',
    width: 'calc(100% - 2rem)',
  }
  return (
    <div sx={sx}>There are no items in this portfolio.</div>
  )
}

export default NoItems
