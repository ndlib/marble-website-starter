import React, { useState } from 'react'
import ReactModal from 'react-modal'
import FeedbackForm from '../FeedbackForm'
// import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Internal/ActionModal'

import style from './style.module.css'

function FeedbackModal () {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <div role='button' onClick={handleOpenModal} className={style.feedbackButton}>FEEDBACK</div>
      <ReactModal
        isOpen={showModal}
        contentLabel='Digital Collection Feedback'
        className={style.modal}
        overlayClassName={style.modaloverlay}
        ariaHideApp
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
      >
        <div className={style.container}>
          <div className={style.headingContainer}><h2>Digital Collection Feedback</h2>
            <div role='button' onClick={handleCloseModal} className={style.closebutton}>X</div>
          </div>
          <FeedbackForm />
        </div>
      </ReactModal>
    </div>
  )
}

ReactModal.setAppElement('body')

export default FeedbackModal
