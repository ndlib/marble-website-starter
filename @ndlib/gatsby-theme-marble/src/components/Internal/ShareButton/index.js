import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ActionButton from 'components/Shared/ActionButtonGroup/ActionButton'
import ActionModal from 'components/Internal/ActionModal'
import ShareModalContent from './ShareModalContent'
import share from 'assets/icons/svg/baseline-share-24px.svg'

const ShareButton = ({ path }) => {
  const [shareOpen, setShareOpen] = useState(false)
  return (
    <React.Fragment>
      <ActionButton
        name='Share'
        action={() => setShareOpen(true)}
        icon={share}
      />
      <ActionModal
        isOpen={shareOpen}
        contentLabel='Share'
        closeFunc={() => setShareOpen(false)}
      >
        <ShareModalContent path={path} />
      </ActionModal>
    </React.Fragment>
  )
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
}
export default ShareButton
