/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import AboutIIIF from './AboutIIIF'
import MaterialButton from 'components/Internal/MaterialButton'
import download from 'utils/download'

const DownloadMetadata = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <AboutIIIF />
      <MaterialButton
        onClick={
          () => download(`${iiifManifest.id}/`, `${iiifManifest.slug.replace('item/', '') || 'manifest'}.json`)
        }
        wide
        primary
      >Download IIIF Manifest</MaterialButton>
    </React.Fragment>
  )
}

DownloadMetadata.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default DownloadMetadata
