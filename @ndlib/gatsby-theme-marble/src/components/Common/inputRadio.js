import React from 'react'

import style from './style.module.css'

const InputRadio = ({ name, label, value, onChange, id }) => {
  return ( 
    <div className={style.inputRadioGroup}>
      <label className={style.inputRadioLabel} htmlFor={name}>{ label }</label>
      <input
        onChange={onChange} 
        value={value}
        className={style.inputRadio} 
        id={id}
        name={name}
        type='radio' 
      />
    </div>
   );
}
 
export default InputRadio;