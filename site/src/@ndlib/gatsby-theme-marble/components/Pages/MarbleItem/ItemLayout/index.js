/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, useThemeUI } from 'theme-ui'
import typy from 'typy'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ManifestImageGroup from 'components/Shared/ManifestImageGroup'
import ManifestMetaData from 'components/Shared/ManifestMetaData'
import HorizontalRule from 'components/Shared/HorizontalRule'
import TombstoneMetadata from './TombstoneMetadata'
import SiblingItems from 'components/Shared/SiblingItems'
import sx from './sx'

const ItemLayout = ({ location, marbleItem, allMarbleFile }) => {
  const context = useThemeUI()
  const primary = typy(context, 'theme.colors.primary').safeString || '#437D8A'
  const accessFields = ['Accession Number', 'Campus Location', 'Access', 'Identifier']
  const mainMetaData = {
    metadata: marbleItem.metadata.filter(item => {
      return !(accessFields.includes(item.label) || item.label === 'Contact Us')
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
      <MultiColumn>
        <Column>
          <TombstoneMetadata marbleItem={marbleItem} />
        </Column>
        <Column>
          <ActionButtonGroup marbleItem={marbleItem} />
          <ManifestImageGroup
            location={location}
            marbleItem={marbleItem}
            allMarbleFile={allMarbleFile}
          />
        </Column>
      </MultiColumn>
      <HorizontalRule color={primary} />
      <MultiColumn columns='5'>
        <Column colSpan='3'>
          <div sx={sx.mainMetadata}>
            <ManifestMetaData marbleItem={mainMetaData} />
          </div>
        </Column>
        <Column colSpan='2'>
          <div sx={sx.sideMetadata}>
            <ManifestMetaData marbleItem={accessMetadata} />
          </div>
        </Column>
      </MultiColumn>
      <div sx={sx.contactMetadata}>
        <ManifestMetaData marbleItem={contactUsMetadata} />
      </div>
      <HorizontalRule color={primary} />
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
