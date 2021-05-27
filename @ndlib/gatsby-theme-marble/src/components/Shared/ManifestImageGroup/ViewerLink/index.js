/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import { jsx } from 'theme-ui'
import ActionModal from 'components/Shared/ActionModal'
import ViewerContent from './ViewerContent'

const ViewerLink = ({
  marbleItem,
  index = 0,
  view = 'default',
  children,
}) => {
  const { marbleConfiguration } = useStaticQuery(query)
  const [modalOpen, setModalOpen] = useState(false)
  if (!marbleConfiguration.iiifViewerUrl) {
    return (
      <>{children}</>
    )
  }
  const downloadable = marbleItem.copyrightRestricted ? 'dl=false' : 'dl=true'
  const viewerLink = `${marbleConfiguration.iiifViewerUrl}${marbleItem.iiifUri}&cv=${index}&view=${view}&title=false&${downloadable}`
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
          viewerUrl={marbleConfiguration.iiifViewerUrl}
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

export const query = graphql`
query {
  marbleConfiguration {
    iiifViewerUrl
  }
}
`
