/* eslint-disable complexity */
import React from 'react'
import useForm from './useForm'
import validate from './LoginFormValidationRules'
import Recaptcha from 'react-google-invisible-recaptcha'

import style from './style.module.css'

const Form = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate)

  function login () {
    console.log('No errors, submit callback called!')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor='name' className={style.inputTextLabel}>Name</label>
        <input className={style.inputText} type='name' id='name' name='name' autoFocus onChange={handleChange} value={values.name || ''} />
        <label htmlFor='email' className={style.inputTextLabel}>Email Address</label>
        <input autoComplete='off' className={style.inputText} type='email' id='email' name='email' onChange={handleChange} value={values.email || ''} />
        {errors.email && (
          <p className={style.alert}>{errors.email}</p>
        )}
        <div className={style.inputRadioGroup}>
          <label htmlFor='comment' className={style.inputRadioLabel}>Comment</label>
          <input className={style.inputRadio} type='radio' name='category' id='comment' onChange={handleChange} value={'comment' || ''} />
          <label htmlFor='correction' className={style.inputRadioLabel}>Correction</label>
          <input className={style.inputRadio} type='radio' name='category' id='correction' onChange={handleChange} value={'correction' || ''} />
          <label htmlFor='bug' className={style.inputRadioLabel}>Bug</label>
          <input className={style.inputRadio} type='radio' name='category' id='bug' onChange={handleChange} value={'bug' || ''} />
        </div>
        {errors.category && (
          <p className={`${style.alert} ${style.categoryAlert}`}>{errors.category}</p>
        )}
        <label htmlFor='feedback' className={style.inputBoxLabel}>Tell us about your experience, ideas, questions, or issues related to the site. Alternatively, take our survey!</label>
        <input className={style.inputBox} type='textarea' id='feedback' name='feedback' onChange={handleChange} value={values.feedback || ''} />
        {errors.feedback && (
          <p className={style.alert}>{errors.feedback}</p>
        )}
        <button type='submit' className={style.submit}>Submit</button>
      </form>
      <Recaptcha
        // ref={ ref => recaptcha = ref }
        sitekey='6Lc55r4ZAAAAAJB88-LnVYJQ2q8zemWpNAjFYkN1'
        onResolved={() => console.log('Human detected.')}
      />
    </div>
  )
}

export default Form
