/* eslint-disable complexity */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useForm from './useForm'
import validate from './LoginFormValidationRules'
import Recaptcha from 'react-google-invisible-recaptcha'
import sx from './sx'
import MaterialButton from 'components/Internal/MaterialButton'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import { createData } from './api'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'

import style from 'components/App/FormElements/style.module.css'

export const Form = ({ user }) => {
  const [fullName, changeName] = useState('')
  const [email, changeEmail] = useState('')
  const [feedback, changeFeedback] = useState('')
  const [patching, setPatching] = useState(false)
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g

  const {
    handleSubmit,
  } = useForm(submit, validate)

  function submit () {
    console.log('Submitted')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        {/* <label htmlFor='name' sx={sx.inputTextLabel}>Name</label> */}
        {/* <input sx={sx.inputText} type='name' id='name' name='name' autoFocus onChange={handleChange} value={values.name || ''} /> */}

        <TextField
          id='fullName'
          label='Name'
          defaultValue={fullName}
          onChange={(event) => {
            changeName(event.target.value)
          }}
          disabled={patching}
          valid={fullName !== ''}
          warning='Name cannot be blank.'
        />
        {/* <label htmlFor='email' sx={sx.inputTextLabel}>Email Address</label>
        <input sx={sx.inputText} type='email' id='email' name='email' onChange={handleChange} value={values.email || ''} />
        {errors.email && (
          <div role='alert' sx={sx.alert}>{errors.email}</div>
        )} */}
        <TextField
          id='email'
          label='Email Address'
          defaultValue={email}
          onChange={(event) => {
            changeEmail(event.target.value)
          }}
          disabled={patching}
          valid={email.match(emailRegex)}
          warning='Email must be a valid address.'
        />
        {/* <div sx={sx.inputRadioGroup}>
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
        )} */}
        <TextArea
          id='feedback'
          label='Tell us about your experience, ideas, questions, or issues related to the site. Alternatively, take our survey!'
          defaultValue='Please input feedback here'
          onChange={(event) => {
            changeFeedback(event.target.value)
          }}
          valid={feedback !== ''}
          warning='Feedback cannot be blank.'
          disabled={patching}
        />
                <div className={style.buttonGroup}>
        <Recaptcha
        // ref={ ref => recaptcha = ref }
        sitekey='6Lc55r4ZAAAAAJB88-LnVYJQ2q8zemWpNAjFYkN1'
        onResolved={() => console.log('Human detected.')}
      />
        <MaterialButton
          onClick={(e) => {
            e.preventDefault()
            setPatching(true)
            const body = {
              fullName: fullName,
              email: email,
              feedback: feedback,
            }
            createData({
              contentType: 'user',
              body: body,
              successFunc: () => {
                navigate(`/`)
              },
              errorFunc: (e) => {
                console.error(e)
              },
            })
          }}
          disabled={patching}
          primary
        >Submit</MaterialButton>
      </div>
      </form>
      
    </div>
  )
}

export const mapStateToProps = (state) => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form)
