/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import ActionModal from 'components/Internal/ActionModal'
import FeedbackForm from '../FeedbackForm'
import sx from './sx'

const FeedbackModal = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleOpenModal = () => {
    setSettingsOpen(true)
  }
  const handleCloseModal = () => {
    setSettingsOpen(false)
  }

  return (
    <div>
      <button id='feedbackButton' onClick={handleOpenModal} sx={sx.feedbackButton}>FEEDBACK</button>
      <ActionModal
        isOpen={settingsOpen}
        contentLabel='Digital Collections Feedback'
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
        closeFunc={handleCloseModal}
      >
        <div>
          {/* Optional Google Form as for backup */}
          {/* <iframe title='Digital Collections Feedback' src='https://docs.google.com/forms/d/e/1FAIpQLSd_hrPoNy1SvGYnYAa8d9MQ5fNIQYpkxcHFFVu6rv8VmlFCgw/viewform?embedded=true' frameBorder='0' marginHeight='0' marginWidth='0'>Loading…</iframe> */}
          <FeedbackForm closeFunc={handleCloseModal} />
        </div>
      </ActionModal>
    </div>
  )
}

export default FeedbackModal
