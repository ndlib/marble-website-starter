import React from 'react'
import PropTypes from 'prop-types'
import style from 'components/App/FormElements/style.module.css'

const TextField = ({ id, label, defaultValue = '', disabled = false }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={style.editLabel}
      >{label}</label>
      <input
        id={id}
        type='text'
        className={style.editText}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  )
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
}

export default TextField
