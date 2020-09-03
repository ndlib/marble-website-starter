/* eslint-disable complexity */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import useForm from './useForm'
import validate from './LoginFormValidationRules'
import Recaptcha from 'react-google-invisible-recaptcha'
import sx from './sx'

const Form = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(submit, validate)

  function submit () {
    console.log('Submitted')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor='name' sx={sx.inputTextLabel}>Name</label>
        <input sx={sx.inputText} type='name' id='name' name='name' autoFocus onChange={handleChange} value={values.name || ''} />
        <label htmlFor='email' sx={sx.inputTextLabel}>Email Address</label>
        <input sx={sx.inputText} type='email' id='email' name='email' onChange={handleChange} value={values.email || ''} />
        {errors.email && (
          <div role='alert' sx={sx.alert}>{errors.email}</div>
        )}
        <div sx={sx.inputRadioGroup}>
          <label htmlFor='comment' sx={sx.inputRadioLabel}>Comment</label>
          <input sx={sx.inputRadio} type='radio' name='category' id='comment' onChange={handleChange} value={'comment' || ''} />
          <label htmlFor='correction' sx={sx.inputRadioLabel}>Correction</label>
          <input sx={sx.inputRadio} type='radio' name='category' id='correction' onChange={handleChange} value={'correction' || ''} />
          <label htmlFor='bug' sx={sx.inputRadioLabel}>Bug</label>
          <input sx={sx.inputRadio} type='radio' name='category' id='bug' onChange={handleChange} value={'bug' || ''} />
        </div>
        {errors.category && (
          <div role='alert' sx={sx.alert}>{errors.category}</div>
        )}
        <label htmlFor='feedback' sx={sx.inputBoxLabel}>Tell us about your experience, ideas, questions, or issues related to the site. Alternatively, take our survey!</label>
        <input sx={sx.inputBox} type='textarea' id='feedback' name='feedback' onChange={handleChange} value={values.feedback || ''} />
        {errors.feedback && (
          <div role='alert' sx={sx.alert}>{errors.feedback}</div>
        )}
        <button aria-labelledby='formHeader' type='submit' sx={sx.submit}>Submit</button>
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
