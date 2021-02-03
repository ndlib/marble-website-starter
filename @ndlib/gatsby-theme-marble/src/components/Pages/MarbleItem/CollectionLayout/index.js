import React from 'react'
import PropTypes from 'prop-types'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ManifestDescription from 'components/Shared/ManifestDescription'
import ManifestMetaData from 'components/Shared/ManifestMetaData'
import ManifestImageGroup from 'components/Shared/ManifestImageGroup'
import ChildManifests from 'components/Shared/ChildManifests'
import PartiallyDigitized from 'components/Shared/PartiallyDigitized'

const CollectionLayout = ({ marbleItem, location }) => {
  const headerItem = marbleItem.childrenMarbleFile ? (
    marbleItem.childrenMarbleFile[0]) : null
  return (
    <>
      <MultiColumn columns='5'>
        <Column colSpan='2'>
          <ActionButtonGroup marbleItem={marbleItem} />
          <ManifestDescription marbleItem={marbleItem} />
          <ManifestMetaData marbleItem={marbleItem} />
          <PartiallyDigitized marbleItem={marbleItem} />
        </Column>
        <Column colSpan='3'>
          {headerItem ? (
            <ManifestImageGroup
              location={location}
              marbleItem={marbleItem}
            />
          ) : null}
          <ChildManifests
            marbleItem={marbleItem}
            location={location}
          />
        </Column>
      </MultiColumn>
    </>
  )
}

CollectionLayout.propTypes = {
  location: PropTypes.object.isRequired,
  marbleItem: PropTypes.object.isRequired,
}
export default CollectionLayout
