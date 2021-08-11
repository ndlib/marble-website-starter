/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const active = {
  color: '#fff',
  backgroundColor: '#000',
  left: 'auto',
  top: 'auto',
  width: '30%',
  height: 'auto',
  overflow: 'auto',
  margin: '10px 35%',
  padding: '5px',
  textAlign: 'center',
  fontSize: '1.2em',
  zIndex: '999',
}

export const sx = {
  left: '-999px',
  position: 'absolute',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  zIndex: '-999',
  '&:focus': active,
  '&:active': active,
}

const Voiceover = ({ text }) => {
  return (
    <p sx={sx} id='hiddenVoiceover'>{text}</p>
  )
}

Voiceover.propTypes = {
  text: PropTypes.object.isRequired,
}

export default Voiceover