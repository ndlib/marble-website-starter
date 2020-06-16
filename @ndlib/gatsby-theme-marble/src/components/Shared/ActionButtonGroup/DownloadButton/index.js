import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ActionButton from 'components/Shared/ActionButtonGroup/ActionButton'
import ActionModal from 'components/Internal/ActionModal'
import DownloadModalContent from './DownloadModalContent'
import downloadImg from 'assets/icons/svg/baseline-save_alt-24px.svg'

const DownloadButton = ({ ndJson }) => {
  const [downloadOpen, setDownloadOpen] = useState(false)
  return (
    <>
      <ActionButton
        name='Download'
        action={() => setDownloadOpen(true)}
        icon={downloadImg}
      />
      <ActionModal
        isOpen={downloadOpen}
        contentLabel='Download'
        closeFunc={() => setDownloadOpen(false)}
        fullscreen
      >
        <DownloadModalContent
          ndJson={ndJson}
        />
      </ActionModal>
    </>
  )
}

DownloadButton.propTypes = {
  ndJson: PropTypes.object.isRequired,
}
export default DownloadButton
