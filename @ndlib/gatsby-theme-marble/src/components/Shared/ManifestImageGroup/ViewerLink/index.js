/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import ActionModal from 'components/Shared/ActionModal'
import { jsx } from 'theme-ui'

const ViewerLink = ({
  marbleItem,
  index,
  view,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  if (!process.env.IIIF_VIEWER_URL) {
    return (
      <>{children}</>
    )
  }
  const viewerLink = `${process.env.IIIF_VIEWER_URL}${marbleItem.iiifUri}&cv=${index}&view=${view}`
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
        contentLabel='Image Viewer'
        isOpen={modalOpen}
        closeFunc={() => setModalOpen(false)}
        externalLink={viewerLink}
        fullscreen
      >
        <iframe
          allowFullScreen
          title='IIIF Viewer'
          src={`${viewerLink}&title=false`}
          style={{
            border: 'none',
            height: 'calc(100vh - 92px - 3rem)',
            width: 'calc(100vw - 92px)',
            position: 'absolute',
            left: '0',
          }}
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
ViewerLink.defaultProps = {
  index: 0,
  view: 'default',
}

export default ViewerLink
