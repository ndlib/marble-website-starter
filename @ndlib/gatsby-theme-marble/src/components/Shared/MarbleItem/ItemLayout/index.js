/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Divider, Flex, Box } from 'theme-ui'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ManifestImageGroup from 'components/Shared/ManifestImageGroup'
import ManifestMetaData from 'components/Shared/ManifestMetaData'
import TombstoneMetadata from './TombstoneMetadata'
import SiblingItems from 'components/Shared/SiblingItems'
import sx from './sx'

const ItemLayout = ({ location, marbleItem, allMarbleFile }) => {
  const accessFields = ['Accession Number', 'Campus Location', 'Access', 'Identifier']
  const ignoreFields = ['URI Value']
  const mainMetaData = {
    metadata: marbleItem.metadata.filter(item => {
      return !(ignoreFields.includes(item.label) || accessFields.includes(item.label) || item.label === 'Contact Us')
    }),
  }
  const accessMetadata = {
    metadata: marbleItem.metadata.filter(item => {
      return accessFields.includes(item.label)
    }),
  }
  const contactUsMetadata = {
    metadata: marbleItem.metadata.filter(item => {
      return item.label === 'Contact Us'
    }),
  }

  return (
    <>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', 'calc(50% - 2rem)'], px: '1rem', py: '1rem' }}>
          <TombstoneMetadata marbleItem={marbleItem} />
        </Box>
        <Box sx={{ width: ['100%', 'calc(50% - 2rem)'], px: '1rem', py: '1rem' }}>
          <ManifestImageGroup
            location={location}
            marbleItem={marbleItem}
            allMarbleFile={allMarbleFile}
          />
          <ActionButtonGroup marbleItem={marbleItem} />
        </Box>
      </Flex>
      <Divider sx={sx.hr} />
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', '60%'], px: '1rem', py: '1rem' }}>
          <div sx={sx.mainMetadata}>
            <ManifestMetaData marbleItem={mainMetaData} />
          </div>
        </Box>
        <Box sx={{ width: ['100%', '40%'], px: '1rem', py: '1rem' }}>
          <div sx={sx.sideMetadata}>
            <ManifestMetaData marbleItem={accessMetadata} />
          </div>
        </Box>
      </Flex>
      <div sx={sx.contactMetadata}>
        <ManifestMetaData marbleItem={contactUsMetadata} />
      </div>
      <Divider sx={sx.hr} />
      <SiblingItems
        marbleItem={marbleItem}
        numberBeforeAndAfter={3}
      />
    </>
  )
}

ItemLayout.propTypes = {
  allMarbleFile: PropTypes.object,
  marbleItem: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default ItemLayout