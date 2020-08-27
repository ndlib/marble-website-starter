/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import ReactModal from 'react-modal'
import FeedbackForm from '../FeedbackForm'
import sx from './sx'

// import style from './style.module.css'

const FeedbackModal = () => {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <div role='button' id='feedbackButton' onClick={handleOpenModal} sx={sx.feedbackButton}>FEEDBACK</div>
      <ReactModal
        isOpen={showModal}
        contentLabel='Digital Collection Feedback'
        sx={sx.modal}
        overlayClassName={sx.modaloverlay}
        ariaHideApp
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
      >
        <div sx={sx.wrapper}>
          <div id='formHeader' sx={sx.headingContainer}><h2>Digital Collection Feedback</h2>
            <div role='button' onClick={handleCloseModal} sx={sx.closebutton}>X</div>
          </div>
          <FeedbackForm />
        </div>
      </ReactModal>
    </div>
  )
}

ReactModal.setAppElement('body')

export default FeedbackModal
