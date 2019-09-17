/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import style from './style.module.css'

const MaterialButton = ({
  children,
  onClick,
  primary = false,
  wide = false,
  id,
  disabled = false,
}) => {
  return (
    <button
      id={id}
      className={style.materialButton}
      onClick={(e) => onClick(e)}
      sx={{
        backgroundColor: primary ? 'primary' : 'gray.0',
        color: primary ? 'white' : 'gray.4',
        width: wide ? '250px' : '100px',
      }}
      disabled={disabled}
    >{children}</button>
  )
}

MaterialButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
  wide: PropTypes.bool,
  id: PropTypes.string,
  disabled: PropTypes.bool,
}

export default MaterialButton
