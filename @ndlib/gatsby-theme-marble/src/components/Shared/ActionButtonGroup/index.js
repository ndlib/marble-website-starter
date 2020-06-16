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

const ActionButtonGroup = ({ ndJson }) => {
  if (!ndJson) {
    return null
  }
  return (
    <React.Fragment>
      <section sx={{
        display: 'flex',
        width: '100%',
      }}
      >
        <BookmarkGroup ndJson={ndJson} />
        <ShareButton path={`item/${typy(ndJson, 'id').safeString}`} />
        <PrintButton />
        <DownloadButton ndJson={ndJson} />
      </section>
    </React.Fragment>
  )
}

ActionButtonGroup.propTypes = {
  ndJson: PropTypes.object.isRequired,
}

export default ActionButtonGroup
