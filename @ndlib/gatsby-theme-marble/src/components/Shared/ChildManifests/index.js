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
          typy(marbleItem, 'childrenMarbleItem').safeArray.map(manifest => {
            if (!manifest) {
              return null
            }
            return (
              <ManifestCard
                key={manifest.iiifUri}
                iiifManifest={manifest.iiifUri}
                showSummary
              />
            )
          })
        }
      </DisplayViewToggle>
    </>
  )
}

ChildManifests.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}

export default ChildManifests
