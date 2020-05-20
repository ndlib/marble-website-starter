/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import { jsx } from 'theme-ui'
import BookmarkGroup from './BookmarkGroup'
import ShareButton from 'components/Internal/ShareButton'
import PrintButton from 'components/Internal/PrintButton'
import DownloadButton from './DownloadButton'

const ActionButtonGroup = ({ iiifManifest }) => {
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
        <ShareButton path={`${typy(iiifManifest, 'slug').safeString}`} />
        <PrintButton />
        <DownloadButton iiifManifest={iiifManifest} />
      </section>
    </React.Fragment>
  )
}

ActionButtonGroup.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default ActionButtonGroup
