/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ViewerModal from './ViewerModal'
import { jsx } from 'theme-ui'

const ViewerLink = ({
  marbleItem,
  index,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  if (!process.env.IIIF_VIEWER_URL) {
    return (
      <>{children}</>
    )
  }
  const viewerLink = `${process.env.IIIF_VIEWER_URL}${marbleItem.iiifUri}`
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
      <ViewerModal
        contentLabel={marbleItem.title}
        isOpen={modalOpen}
        closeFunc={() => setModalOpen(false)}
        externalLink={viewerLink}
      >
        <iframe
          title='IIIF Viewer'
          src={`${viewerLink}&title=false`}
          style={{
            border: 'none',
            height: 'calc(100vh - 3rem)',
            width: '100vw',
          }}
        />
      </ViewerModal>
    </>
  )
}

ViewerLink.propTypes = {
  marbleItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    iiifUri: PropTypes.string.isRequired,
  }),
  index: PropTypes.number,
  children: PropTypes.node,
}
ViewerLink.defaultProps = {
  index: 0,
  view: 'default',
}

export default ViewerLink
