import React from 'react'
import PropTypes from 'prop-types'
import style from 'components/App/FormElements/style.module.css'

const TextArea = ({ id, label, defaultValue = '', disabled = false }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={style.editLabel}
      >{label}</label>
      <textarea
        id={id}
        className={style.editTextArea}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  )
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
}

export default TextArea
