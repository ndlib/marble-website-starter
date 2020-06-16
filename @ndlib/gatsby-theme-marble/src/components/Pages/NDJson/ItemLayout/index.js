import React from 'react'
import PropTypes from 'prop-types'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ManifestDescription from 'components/Shared/ManifestDescription'
import ManifestImageGroup from 'components/Shared/ManifestImageGroup'
import ManifestMetaData from 'components/Shared/ManifestMetaData'
import PartiallyDigitized from 'components/Shared/PartiallyDigitized'

const ItemLayout = ({ location, ndJson }) => {
  return (
    <>
      <div><p>ITEM Text previously from markdown</p></div>
      <MultiColumn>
        <Column>
          <ActionButtonGroup ndJson={ndJson} />
          <ManifestImageGroup
            location={location}
            ndJson={ndJson}
          />
        </Column>
        <Column>
          <ManifestMetaData ndJson={ndJson} />
          <PartiallyDigitized ndJson={ndJson} />
        </Column>
      </MultiColumn>
      <ManifestDescription ndJson={ndJson} />
    </>
  )
}

ItemLayout.propTypes = {
  ndJson: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default ItemLayout
