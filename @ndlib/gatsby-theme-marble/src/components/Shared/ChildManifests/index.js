// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import CardGroup from 'components/Shared/DisplayCard/CardGroup'
import MarbleItemCard from 'components/Shared/DisplayCard/MarbleItemCard'
import findImage from 'utils/findImage'

export const ChildManifests = ({ marbleItem }) => {
  if (!marbleItem || !typy(marbleItem, 'childrenMarbleItem').isArray) {
    return null
  }
  return (
    <>
      <h2 className='accessibilityOnly'>Related Items</h2>
      <CardGroup defaultDisplay='grid' toggleGroup='related-items' gridWidthRule={['100%', '100%', '50%', '100%', '50%']}>
        {
          typy(marbleItem, 'childrenMarbleItem').safeArray.map(childItem => {
            if (!childItem) {
              return null
            }
            return (
              <MarbleItemCard
                key={childItem}
                target={childItem.slug}
                image={findImage(childItem.childrenMarbleFile, childItem, true)}
                title={childItem.title}
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
