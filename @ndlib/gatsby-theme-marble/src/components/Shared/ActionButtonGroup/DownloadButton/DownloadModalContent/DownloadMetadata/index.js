/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import AboutIIIF from './AboutIIIF'
import MaterialButton from 'components/Internal/MaterialButton'
import download from 'utils/download'

const DownloadMetadata = ({ ndJson }) => {
  return (
    <React.Fragment>
      <AboutIIIF />
      <MaterialButton
        onClick={
          () => download(`${ndJson.iiifUri}/`, `${ndJson.id || 'manifest'}.json`)
        }
        wide
        primary
      >Download IIIF Manifest
      </MaterialButton>
    </React.Fragment>
  )
}

DownloadMetadata.propTypes = {
  ndJson: PropTypes.object.isRequired,
}

export default DownloadMetadata
