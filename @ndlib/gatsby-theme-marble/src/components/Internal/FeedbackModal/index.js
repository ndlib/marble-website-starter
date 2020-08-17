import React, { Component } from 'react'
import ReactModal from 'react-modal'
import FeedbackForm from '../FeedbackForm'

import style from './style.module.css'

export class FeedbackModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal () {
    this.setState({ showModal: true })
  }

  handleCloseModal () {
    this.setState({ showModal: false })
  }

  render () {
    return (
      <div>
        <div onClick={this.handleOpenModal} className={style.feedbackButton}>FEEDBACK</div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel='Feedback Form'
          className={style.modal}
          overlayClassName={style.modaloverlay}
          shouldFocusAfterRender
          shouldReturnFocusAfterClose
        >
        <div className={style.container}>
          <div className={style.headingContainer}>
            <h2>Digital Collections Feedback</h2>
              <button
                className={style.closebutton}
                title='Close' 
                aria-label='Close' 
                onClick={this.handleCloseModal}>
                X
              </button>
          </div>
          <FeedbackForm />
        </div>
      </ReactModal>
      </div>
    )
  }
}
ReactModal.setAppElement('body')

export default FeedbackModal