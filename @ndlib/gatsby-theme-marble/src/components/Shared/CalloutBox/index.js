/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const CalloutBox = ({ children }) => {
  return (
    <div
      sx={{
        border: '1px solid',
        borderColor: 'gray.1',
        backgroundColor: 'background',
        margin: '2rem auto',
        maxWidth: ['100%', '100%', '80%'],
        padding: '1rem',
        wordWrap: 'break-word',
      }}>{children}</div>
  )
}

CalloutBox.propTypes = {
  children: PropTypes.node,
}

export default CalloutBox
