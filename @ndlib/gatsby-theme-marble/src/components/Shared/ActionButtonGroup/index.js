/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import BookmarkGroup from './BookmarkGroup'
import ShareButton from 'components/Internal/ShareButton'
import PrintButton from 'components/Internal/PrintButton'
import DownloadButton from './DownloadButton'

const ActionButtonGroup = ({ marbleItem }) => {
  if (!marbleItem) {
    return null
  }
  return (
    <React.Fragment>
      <section sx={{
        display: 'flex',
        width: '100%',
      }}
      >
        <BookmarkGroup marbleItem={marbleItem} />
        <ShareButton path={marbleItem.slug} />
        <PrintButton />
        <DownloadButton marbleItem={marbleItem} />
      </section>
    </React.Fragment>
  )
}

ActionButtonGroup.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}

export default ActionButtonGroup
