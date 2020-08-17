import React from 'react'

import style from './style.module.css'

const InputText = ({ name, label, value, autoFocus, onChange, error }) => {
  return ( 
    <div className={style.formGroup}>
        <label className={style.inputTextLabel} htmlFor={name}>{label}</label>
        <input
          onChange={onChange} 
          value={value}
          className={style.inputText} 
          id={name}
          name={name}
          autoFocus={autoFocus}
          type='text' 
        />
        {error && <div className={style.alert}>{error}</div>}
      </div>
   );
}
 
export default InputText;