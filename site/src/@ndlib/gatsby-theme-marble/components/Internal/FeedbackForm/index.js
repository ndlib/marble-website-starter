/* eslint-disable complexity */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import PropTypes from 'prop-types'
import useForm from './useForm'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Internal/MaterialButton'
import TextField from '@ndlib/gatsby-theme-marble/src/components/App/FormElements/TextField'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/App/FormElements/TextArea'
import { createData } from './api'
import { connect } from 'react-redux'
import typy from 'typy'
import sx from './sx'

export const Form = ({ closeFunc }) => {
  const [response, setResponse] = useState(false)
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

  if (response) {
    return (
      <div>
        <form>
          <p>Thank you for your feedback</p>
          <p>Your ServiceNow ticket number is: #{typy(response.result, 'number').safeString}</p>
          <div sx={sx.buttonGroup}>
            <MaterialButton
              onClick={() => {
                changeFeedback('')
                setResponse(false)
              }}
              primary
            >Another?
            </MaterialButton>
            <MaterialButton
              onClick={() => {
                closeFunc()
              }}
              primary
            >Close
            </MaterialButton>
          </div>
        </form>
      </div>
    )
  } else {
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
                  assignment_group: 'e7f56ce737044200f8b78ff1b3990e85',
                }
                createData({
                  body: body,
                  successFunc: (data) => {
                    setResponse(data)
                    setPatching(false)
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
