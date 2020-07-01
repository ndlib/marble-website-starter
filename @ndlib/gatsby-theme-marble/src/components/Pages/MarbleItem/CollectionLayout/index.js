import React from 'react'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ManifestDescription from 'components/Shared/ManifestDescription'

import PartiallyDigitized from 'components/Shared/PartiallyDigitized'

const CollectionLayout = ({ ndJson }) => {
  return (
    <>
      <div><p>Collection Text previously from markdown</p></div>
      <MultiColumn columns='5'>
        <Column colSpan='2'>
          <ActionButtonGroup ndJson={ndJson} />
          <ManifestDescription ndJson={ndJson} />
          <div>ManifestMetaData</div>
          <PartiallyDigitized ndJson={ndJson} />
        </Column>
        <Column colSpan='3'>
          <div>ChildManifests</div>

        </Column>
      </MultiColumn>

    </>
  )
}

export default CollectionLayout
