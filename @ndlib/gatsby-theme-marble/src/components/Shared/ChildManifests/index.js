// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import ManifestCard from '../ManifestCard'

export const ChildManifests = ({ marbleItem }) => {
  if (!marbleItem || !typy(marbleItem, 'childrenMarbleItem').isArray) {
    return null
  }
  return (
    <>
      <h2 className='accessibilityOnly'>Related Items</h2>
      <DisplayViewToggle>
        {
          typy(marbleItem, 'childrenMarbleItem').safeArray.map(childItem => {
            if (!childItem) {
              return null
            }
            return (
              <ManifestCard
                key={childItem}
                target={childItem.slug}
                image={typy(childItem, 'childrenMarbleIiifImage[0].thumbnail').safeString}
                label={childItem.title}
                showSummary
                referal={{
                  type: 'item',
                  backLink: `/${marbleItem.slug}`,
                  parentName: marbleItem.title,
                }}
              />
            )
          })
        }
      </DisplayViewToggle>
    </>
  )
}

ChildManifests.propTypes = {
  marbleItem: PropTypes.object,
}

export default ChildManifests
