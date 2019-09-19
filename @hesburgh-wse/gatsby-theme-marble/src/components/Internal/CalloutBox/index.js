/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import { jsx } from 'theme-ui'

const CalloutBox = ({ children }) => {
  return (
    <div
      className={style.wrapper}
      sx={{
        border: '1px solid',
        borderColor: 'gray.2',
        backgroundColor: '#fff',
        boxShadow: '2px 2px 8px 2px rgba(153,153,153,0.5)',
        margin: '2rem auto',
        padding: '1rem',
      }}>{children}</div>
  )
}

CalloutBox.propTypes = {
  children: PropTypes.node,
}

export default CalloutBox
