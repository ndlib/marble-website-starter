/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import ActionModal from 'components/Shared/ActionModal'
import ViewerContent from './ViewerContent'

const ViewerLink = ({
  marbleItem,
  index = 0,
  view = 'default',
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  if (!process.env.IIIF_VIEWER_URL) {
    return (
      <>{children}</>
    )
  }
  const viewerLink = `${process.env.IIIF_VIEWER_URL}${marbleItem.iiifUri}&cv=${index}&view=${view}&title=false`
  return (
    <>
      <div
        role='button'
        onClick={() => {
          setModalOpen(!modalOpen)
        }}
        onKeyDown={(ev) => {
          if (ev.keyCode === 13) {
            setModalOpen(!modalOpen)
          }
        }}
        sx={{
          cursor: 'pointer',
          position: 'relative',
        }}
        tabIndex={0}
      >
        {children}
      </div>
      <ActionModal
        contentLabel={marbleItem.title}
        isOpen={modalOpen}
        closeFunc={() => setModalOpen(false)}
        externalLink={viewerLink}
        fullscreen
      >
        <ViewerContent
          marbleItem={marbleItem}
          index={index}
          view={view}
        />
      </ActionModal>
    </>
  )
}

ViewerLink.propTypes = {
  marbleItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    iiifUri: PropTypes.string.isRequired,
  }),
  view: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.node,
}

export default ViewerLink
