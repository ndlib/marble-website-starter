// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import CardGroup from 'components/Shared/CardGroup'
import ManifestCard from '../ManifestCard'
import findImage from 'utils/findImage'

export const ChildManifests = ({ marbleItem }) => {
  if (!marbleItem || !typy(marbleItem, 'childrenMarbleItem').isArray) {
    return null
  }
  return (
    <>
      <h2 className='accessibilityOnly'>Related Items</h2>
      <CardGroup defaultDisplay='grid' toggleGroup='related-items'>
        {
          typy(marbleItem, 'childrenMarbleItem').safeArray.map(childItem => {
            if (!childItem) {
              return null
            }
            return (
              <ManifestCard
                key={childItem}
                target={childItem.slug}
                image={findImage(childItem.childrenMarbleFile, childItem, true)}
                label={childItem.title}
                showSummary
              />
            )
          })
        }
      </CardGroup>
    </>
  )
}

ChildManifests.propTypes = {
  marbleItem: PropTypes.object,
}

export default ChildManifests
