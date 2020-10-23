/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { BaseStyles, jsx } from 'theme-ui'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import DownloadImage from './DownloadImage'
import DownloadMetadata from './DownloadMetadata'
import DownloadPdf from './DownloadPdf'
import DownloadCitation from './DownloadCitation'
import Copyright from './Copyright'
import sx from './sx'

const DownloadModalContent = ({ marbleItem }) => {
  return (
    <React.Fragment>
      <MultiColumn columns='2'>
        <Column>
          <BaseStyles>
            <h2 sx={sx.header}>Image</h2>
          </BaseStyles>
          <DownloadImage marbleItem={marbleItem} />
        </Column>
        <Column>
          <BaseStyles>
            <h2 sx={sx.header}>Metadata</h2>
          </BaseStyles>
          <div sx={sx.metadata}>
            <DownloadMetadata marbleItem={marbleItem} />
            <DownloadPdf marbleItem={marbleItem} />
          </div>
          <DownloadCitation marbleItem={marbleItem} />
        </Column>
      </MultiColumn>
      <Copyright />
    </React.Fragment>
  )
}

DownloadModalContent.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}

export default DownloadModalContent
