import React from 'react'

import style from './style.module.css'

const InputBox = ({ name, label, value, onChange, error }) => {
  return ( 
    <div className={style.formGroup}>
      <label className={style.inputBoxLabel} htmlFor={name}>{ label }</label>
      <textarea
        onChange={onChange} 
        value={value} 
        className={style.inputBox} 
        id={name}
        name={name}
        type='text' 
      />
      {error && <div className={style.alert}>{error}</div>}
    </div>
   );
}
 
export default InputBox;