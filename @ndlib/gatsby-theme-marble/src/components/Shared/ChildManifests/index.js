import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import ManifestCard from '../ManifestCard'

export const ChildManifests = ({ iiifManifest, displayReducer }) => {
  if (!typy(iiifManifest, 'items').isArray) {
    return null
  }
  return (
    <React.Fragment>
      <h2 className='accessibilityOnly'>Related Items</h2>
      <DisplayViewToggle>
        {
          typy(iiifManifest, 'items').safeArray.map(manifest => {
            return (
              <ManifestCard
                key={manifest.id}
                iiifManifest={manifest}
              >
                <div>{manifest.summary}</div>
              </ManifestCard>
            )
          })
        }
      </DisplayViewToggle>
    </React.Fragment>
  )
}

ChildManifests.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  displayReducer: PropTypes.object,
}

export default ChildManifests
