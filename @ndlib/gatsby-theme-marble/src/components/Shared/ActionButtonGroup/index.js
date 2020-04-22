/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import BookmarkGroup from './BookmarkGroup'
import ActionButton from './ActionButton'
import ManifestLink from './ManifestLink'
import ActionModal from 'components/Internal/ActionModal'
import DownloadModalContent from './DownloadModalContent'
import ShareModalContent from './ShareModalContent'
import print from 'assets/icons/svg/baseline-print-24px.svg'
import share from 'assets/icons/svg/baseline-share-24px.svg'
import downloadImg from 'assets/icons/svg/baseline-save_alt-24px.svg'

const ActionButtonGroup = ({ iiifManifest }) => {
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  if (!iiifManifest) {
    return null
  }
  return (
    <React.Fragment>
      <section sx={{
        display: 'flex',
        width: '100%',
      }}>
        <BookmarkGroup iiifManifest={iiifManifest} />
        <ActionButton
          name='Share'
          action={() => setShareOpen(true)}
          icon={share}
        />
        <ActionButton
          name='Print'
          action={printAction}
          icon={print}
        />
        <ActionButton
          name='Download'
          action={() => setDownloadOpen(true)}
          icon={downloadImg}
        />
        <ManifestLink manifestUrl={iiifManifest.id} />
      </section>
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
      <ActionModal
        isOpen={shareOpen}
        contentLabel='Share'
        closeFunc={() => setShareOpen(false)}
      >
        <ShareModalContent
          iiifManifest={iiifManifest}
        />
      </ActionModal>
    </React.Fragment>
  )
}

ActionButtonGroup.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export const printAction = () => {
  window.print()
}
export default ActionButtonGroup
