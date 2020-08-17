import React from 'react'
import Form from '../../Common/form'

import style from './style.module.css'

class FeedbackForm extends Form {
  state = {
    data: { name: '', email: '', feedback: '', category: '' },
    errors: {}
  }

  doSubmit = () => {
        // Call the Server
        console.log('Submitted')
  }

  render () {
    const { errors } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInputText('name', 'Name', true)}
        {this.renderInputText('email', 'Email' )}
        <div className={style.inputRadioGroup}>
          {this.renderInputRadio('category', 'Comment', 'comment')}
          {this.renderInputRadio('category', 'Correction', 'correction')}
          {this.renderInputRadio('category', 'Bug', 'bug')}
        <div className={style.alertBox}>{errors.category && <div className={style.alert}>{errors.category}</div>}</div>
        </div>
        {this.renderInputBox('feedback', 'Tell us about your experience, ideas, questions, or issues related to the site. Alternatively, take our survey!' )}
        {this.renderCaptcha('6Lc55r4ZAAAAAJB88-LnVYJQ2q8zemWpNAjFYkN1')}
        <div align='right'>{this.renderButton('Submit')}</div>
      </form> 
    ) 
  }
}
 
export default FeedbackForm
