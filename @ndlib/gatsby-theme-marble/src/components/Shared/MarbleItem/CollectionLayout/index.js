/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ManifestDescription from 'components/Shared/ManifestDescription'
import ManifestMetaData from 'components/Shared/ManifestMetaData'
import ManifestImageGroup from 'components/Shared/ManifestImageGroup'
import ChildManifests from 'components/Shared/ChildManifests'
import PartiallyDigitized from 'components/Shared/PartiallyDigitized'

const CollectionLayout = ({ marbleItem, location }) => {
  const headerItem = marbleItem.childrenMarbleFile
    ? (marbleItem.childrenMarbleFile[0])
    : null
  return (
    <>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', '100%', '100%', '40%'], px: '1rem', py: '1rem' }}>
          <ActionButtonGroup marbleItem={marbleItem} />
          <ManifestDescription marbleItem={marbleItem} />
          <ManifestMetaData marbleItem={marbleItem} />
          <PartiallyDigitized marbleItem={marbleItem} />
        </Box>
        <Box sx={{ width: ['100%', '100%', '100%', '60%'], px: '1rem', py: '1rem' }}>
          {headerItem && (
            <ManifestImageGroup
              location={location}
              marbleItem={marbleItem}
            />
          )}
          <ChildManifests
            marbleItem={marbleItem}
            location={location}
          />
        </Box>
      </Flex>
    </>
  )
}

CollectionLayout.propTypes = {
  location: PropTypes.object.isRequired,
  marbleItem: PropTypes.object.isRequired,
}
export default CollectionLayout
