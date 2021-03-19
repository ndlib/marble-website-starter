/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { BaseStyles, jsx, Flex, Box } from 'theme-ui'
import DownloadImage from './DownloadImage'
import DownloadMetadata from './DownloadMetadata'
import DownloadPdf from './DownloadPdf'
import DownloadCitation from './DownloadCitation'
import Copyright from './Copyright'
import sx from './sx'

const DownloadModalContent = ({ marbleItem }) => {
  return (
    <React.Fragment>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', '50%'], px: '1rem', py: '1rem' }}>
          <BaseStyles>
            <h2 sx={sx.header}>Image</h2>
          </BaseStyles>
          <DownloadImage marbleItem={marbleItem} />
        </Box>
        <Box sx={{ width: ['100%', '50%'], px: '1rem', py: '1rem' }}>
          <BaseStyles>
            <h2 sx={sx.header}>Metadata</h2>
          </BaseStyles>
          <div sx={sx.metadata}>
            <DownloadMetadata marbleItem={marbleItem} />
            <DownloadPdf marbleItem={marbleItem} />
          </div>
          <DownloadCitation marbleItem={marbleItem} />
        </Box>
      </Flex>
      <Copyright />
    </React.Fragment>
  )
}

DownloadModalContent.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}

export default DownloadModalContent
