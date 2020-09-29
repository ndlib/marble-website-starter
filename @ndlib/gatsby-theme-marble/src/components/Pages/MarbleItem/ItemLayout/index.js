import React from 'react'
import PropTypes from 'prop-types'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ManifestDescription from 'components/Shared/ManifestDescription'
import ManifestImageGroup from 'components/Shared/ManifestImageGroup'
import ManifestMetaData from 'components/Shared/ManifestMetaData'
import PartiallyDigitized from 'components/Shared/PartiallyDigitized'

const ItemLayout = ({ location, marbleItem, allMarbleIiifImage }) => {
  return (
    <>
      <MultiColumn>
        <Column>
          <ActionButtonGroup marbleItem={marbleItem} />
          <ManifestImageGroup
            location={location}
            marbleItem={marbleItem}
            allMarbleIiifImage={allMarbleIiifImage}
          />
        </Column>
        <Column>
          <ManifestMetaData marbleItem={marbleItem} />
          <PartiallyDigitized marbleItem={marbleItem} />
        </Column>
      </MultiColumn>
      <ManifestDescription marbleItem={marbleItem} />
    </>
  )
}

ItemLayout.propTypes = {
  allMarbleIiifImage: PropTypes.object,
  marbleItem: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default ItemLayout
