/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { Styled, jsx } from 'theme-ui'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import DownloadImage from './DownloadImage'
import DownloadMetadata from './DownloadMetadata'
import DownloadCitation from './DownloadCitation'
import Copyright from './Copyright'
import sx from './sx'

const DownloadModalContent = ({ iiifManifest }) => {
  return (
    <React.Fragment>
      <MultiColumn columns='2'>
        <Column>
          <Styled.h2 sx={sx.header}>Image</Styled.h2>
          <DownloadImage iiifManifest={iiifManifest} />
        </Column>
        <Column>
          <Styled.h2 sx={sx.header}>Metadata</Styled.h2>
          <div sx={sx.metadata}>
            <DownloadMetadata iiifManifest={iiifManifest} />
          </div>
          <Styled.h2 sx={sx.header}>Citation</Styled.h2>
          <div sx={sx.metadata}>
          <DownloadCitation iiifManifest={iiifManifest} />
          </div>
        </Column>
      </MultiColumn>
      <Copyright />
    </React.Fragment>
  )
}

DownloadModalContent.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default DownloadModalContent
