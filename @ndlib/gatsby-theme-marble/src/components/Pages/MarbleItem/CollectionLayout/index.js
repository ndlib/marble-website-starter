import React from 'react'
import PropTypes from 'prop-types'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ManifestDescription from 'components/Shared/ManifestDescription'
import ManifestMetaData from 'components/Shared/ManifestMetaData'
import ChildManifests from 'components/Shared/ChildManifests'
import PartiallyDigitized from 'components/Shared/PartiallyDigitized'

const CollectionLayout = ({ marbleItem }) => {
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
          <ChildManifests marbleItem={marbleItem} />
        </Column>
      </MultiColumn>
    </>
  )
}

CollectionLayout.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}
export default CollectionLayout
