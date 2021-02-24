/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ActionModal from 'components/Internal/ActionModal'
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
        sx={{
          cursor: 'pointer',
          position: 'relative',
        }}
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
          title='IIIF Viewer'
          src={`${viewerLink}&title=false`}
          style={{
            border: 'none',
            height: 'calc(100vh - 56px)',
            width: '100vw',
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
