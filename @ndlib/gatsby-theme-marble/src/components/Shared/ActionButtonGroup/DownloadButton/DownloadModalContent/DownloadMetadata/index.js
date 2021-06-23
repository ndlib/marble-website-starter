/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Button } from 'theme-ui'
import AboutIIIF from './AboutIIIF'
import download from 'utils/download'

const DownloadMetadata = ({ marbleItem }) => {
  return (
    <React.Fragment>
      <AboutIIIF />
      <Button
        onClick={
          () => download(`${marbleItem.iiifUri}/`, `${marbleItem.marbleId || 'manifest'}.json`)
        }
        variant='primary'
      >Download IIIF Manifest
      </Button>
    </React.Fragment>
  )
}

DownloadMetadata.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}

export default DownloadMetadata
