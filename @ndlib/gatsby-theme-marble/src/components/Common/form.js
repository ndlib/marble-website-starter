import React, { Component } from 'react';
import InputText from '../Common/inputText'
import InputTextRadio from '../Common/inputRadio'
import Recaptcha from 'react-google-invisible-recaptcha'

import style from './style.module.css'
import InputBox from './inputBox';

class Form extends Component {
  state = { 
    data: {},
    errors: {},
    value: '',
   }

   validate = () => {
    const errors = {}

    const { data } = this.state

    if (data.email.trim() === '')
      errors.email = 'Email is required'
    if (!data.email.includes('@')) 
      return 'Email requires an @'
    if (data.feedback.trim() === '')
      errors.feedback = 'Please enter your comment or question'
    if (data.category.trim() === '')
      errors.category = 'A selection is required'

    return Object.keys(errors).length === 0 ? null : errors
  }

  validateProperty = ({ name, value }) => {
    if (name === 'email') {
      if (value.trim() === '') return 'Email is required'
      if (!value.includes('@')) return 'Email requires an @'
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return

    if ( '' == this.state.value ) {
      alert( 'Validation failed! Input cannot be empty.' );
      this.recaptcha.reset();
    } else {
      this.recaptcha.execute();
    }

    this.doSubmit()
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    const data = {...this.state.data}
    data[(input.name)] = (input.id === input.name 
      ? input.value : input.id)

    this.setState({ data, errors })
  }

  renderButton(label) {
    return <button onClick={this.handleSubmit} disabled={this.validate()} className={style.button}>
      {label}
      </button>
  }

  renderInputText(name, label, autoFocus) {
    const { data, errors } = this.state
    return (
      <InputText
          type='text'
          name={name}
          autoFocus={autoFocus}
          id={name}
          value={data[name]}
          label={label}
          onChange={this.handleChange}
          error={errors[name]}
          
        />
    )
  }

  renderInputRadio(name, label, id, autoFocus) {
    const { data, errors } = this.state
    return (
      <InputTextRadio
        type='radio'
        name={name}
        id={id}
        value={data[name]} 
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        autoFocus={autoFocus}
        />
    )
  }

  renderInputBox(name, label, autoFocus) {
    const { data, errors } = this.state
    return (
      <InputBox
        type='textbox'
        name={name}
        id={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange} 
        error={errors[name]}
        autoFocus={autoFocus}
      />
    )
  }

  renderCaptcha(sitekey) {
    return(
      <Recaptcha
        sitekey={sitekey}
        ref={ ref => this.recaptcha = ref }
        onResolved={ () => console.log( 'Human detected.' ) }
      />
    )
  }
}
 
export default Form;

