/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import AboutIIIF from './AboutIIIF'
import MaterialButton from 'components/Shared/MaterialButton'
import download from 'utils/download'

const DownloadMetadata = ({ marbleItem }) => {
  return (
    <React.Fragment>
      <AboutIIIF />
      <MaterialButton
        onClick={
          () => download(`${marbleItem.iiifUri}/`, `${marbleItem.marbleId || 'manifest'}.json`)
        }
        wide
        primary
      >Download IIIF Manifest
      </MaterialButton>
    </React.Fragment>
  )
}

DownloadMetadata.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}

export default DownloadMetadata
