/* eslint-disable complexity */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import PropTypes from 'prop-types'
import useForm from './useForm'
// import Recaptcha from 'react-google-invisible-recaptcha'
import MaterialButton from 'components/Internal/MaterialButton'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import { createData } from './api'
import { connect } from 'react-redux'

export const Form = ({ closeFunc, user }) => {
  const [name, changeName] = useState('')
  const [email, changeEmail] = useState('')
  const [feedback, changeFeedback] = useState('')
  const [patching, setPatching] = useState(false)
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g

  const {
    handleSubmit,
  } = useForm(submit)

  function submit () {
    console.log('Submitted')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id='name'
          label='Name'
          defaultValue={name}
          onChange={(event) => {
            changeName(event.target.value)
          }}
          disabled={patching}
          valid={name !== ''}
          warning='Name cannot be blank.'
        />
        <TextField
          id='email'
          label='Email Address'
          defaultValue={email}
          onChange={(event) => {
            changeEmail(event.target.value)
          }}
          disabled={patching}
          valid={emailRegex.test(email)}
          warning='Email must be a valid address.'
        />
        <TextArea
          id='feedback'
          label='Tell us about your experience, ideas, questions, or issues related to the site. Alternatively, take our survey!'
          defaultValue=''
          onChange={(event) => {
            changeFeedback(event.target.value)
          }}
          valid={feedback !== ''}
          warning='Feedback cannot be blank.'
          disabled={patching}
        />
        <div>
          <MaterialButton
            onClick={(e) => {
              e.preventDefault()
              setPatching(true)
              const body = {
                name: name,
                email: email,
                feedback: feedback,
              }
              createData({
                contentType: 'user',
                body: body,
                successFunc: () => {
                  closeFunc()
                  alert('Thank You! Ticket Number: ######')
                },
                errorFunc: (e) => {
                  console.error(e)
                },
              })
            }}
            disabled={patching || !email.match(emailRegex) || name === '' || feedback === ''}
            primary
          >Submit
          </MaterialButton>
        </div>
      </form>
    </div>
  )
}

Form.propTypes = {
  closeFunc: PropTypes.func,
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
