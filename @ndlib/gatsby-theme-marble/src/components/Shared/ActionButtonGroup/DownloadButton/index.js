import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ActionButton from 'components/Shared/ActionButtonGroup/ActionButton'
import ActionModal from 'components/Internal/ActionModal'
import DownloadModalContent from './DownloadModalContent'
import downloadImg from 'assets/icons/svg/baseline-save_alt-24px.svg'

const DownloadButton = ({ iiifManifest }) => {
  const [downloadOpen, setDownloadOpen] = useState(false)
  return (
    <React.Fragment>
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
          iiifManifest={iiifManifest}
        />
      </ActionModal>
    </React.Fragment>
  )
}

DownloadButton.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}
export default DownloadButton
