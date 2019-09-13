/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import style from './style.module.css'

const MaterialButton = ({
  label,
  onClick,
  primary = false,
  wide = false,
}) => {
  return (
    <button
      className={style.materialButton}
      onClick={() => onClick()}
      sx={{
        backgroundColor: primary ? 'primary' : 'gray.0',
        color: primary ? 'white' : 'gray.4',
        padding: wide ? '.5rem 4rem' : '.5rem 1rem',
        width: wide ? '250px' : '100px',
      }}
    >{label}</button>
  )
}

MaterialButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
  wide: PropTypes.bool,
}

export default MaterialButton
