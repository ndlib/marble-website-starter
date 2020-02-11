import React from 'react'
import PropTypes from 'prop-types'
import style from 'components/App/FormElements/style.module.css'

const TextField = ({ id, label, onChange, defaultValue = '', disabled = false }) => {
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
        onChange={onChange}
      />
    </div>
  )
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

TextField.defaultProps = {
  onChange: (event) => {
    console.warn(`TextField changed to "${event.target.value}" but no function was specified in props.`)
  },
}

export default TextField
