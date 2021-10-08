/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'
import typy from 'typy'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ManifestDescription from 'components/Shared/ManifestDescription'
import ManifestMetaData from 'components/Shared/ManifestMetaData'
// import ManifestImageGroup from 'components/Shared/ManifestImageGroup'
// import ChildManifests from 'components/Shared/ChildManifests'
import PartiallyDigitized from 'components/Shared/PartiallyDigitized'
import CollectionItemSearch from './CollectionItemSearch'

const CollectionNewLayout = ({ marbleItem, location }) => {
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
          <div>
            {
              typy(marbleItem, 'childrenMarbleFile[0].iiif.service').safeString && <picture sx={{
                backgroundColor: 'gray.1',
                display: 'flex',
                height: '60vh',
                marginBottom: '2rem',
                minHeight: '500px',
                textAlign: 'center',
                verticalAlign: 'middle',
                width: '100%',
              }}>
                <img
                  src={`${marbleItem.childrenMarbleFile[0].iiif.service}/full/!500,500/0/default.jpg`}
                  alt={marbleItem.title}
                  title=''
                  sx={{
                    margin: 'auto',
                    maxHeight: '100%',
                    maxWidth: '100%',
                  }}
                />
              </picture>
            }
          </div>
          <CollectionItemSearch marbleItem={marbleItem} />
        </Box>
      </Flex>
    </>
  )
}

CollectionNewLayout.propTypes = {
  location: PropTypes.object.isRequired,
  marbleItem: PropTypes.object.isRequired,
}
export default CollectionNewLayout
