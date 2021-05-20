/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Button } from 'theme-ui'
import style from './style.module.css'

const MaterialButton = ({
  children,
  onClick,
  primary = false,
  inverse = false,
  id,
  disabled = false,
}) => {
  return (
    <Button
      id={id}
      className={style.materialButton}
      onClick={(e) => onClick(e)}
      variant={primary ? 'primary' : inverse ? 'inverse' : 'light'}
      disabled={disabled}
    >{children}</Button>
  )
}

MaterialButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
  inverse: PropTypes.bool,
  id: PropTypes.string,
  disabled: PropTypes.bool,
}

export default MaterialButton
