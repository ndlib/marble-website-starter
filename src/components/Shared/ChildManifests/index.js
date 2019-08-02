import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import DisplayViewToggle, { getActiveSettings } from 'components/Internal/DisplayViewToggle'
import ManifestCard from '../ManifestCard'
import {
  COLLECTION_PAGE,
  DISPLAY_GRID,
} from 'store/actions/displayActions'

export const ChildManifests = ({ iiifManifest, displayReducer }) => {
  if (!typy(iiifManifest, 'items').isArray) {
    return null
  }
  const activeSettings = getActiveSettings(displayReducer, COLLECTION_PAGE)
  const cardClass = displayReducer[COLLECTION_PAGE] || DISPLAY_GRID
  return (
    <React.Fragment>
      <h2 className='accessibilityOnly'>Related Items</h2>
      <DisplayViewToggle
        page={COLLECTION_PAGE}
        activeSettings={activeSettings}
      >
        {
          typy(iiifManifest, 'items').safeArray.map(manifest => {
            return (
              <div key={manifest.id}>
                <ManifestCard
                  cardClass={cardClass}
                  iiifManifest={manifest}
                >
                  <div>{manifest.description}</div>
                </ManifestCard>
              </div>
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

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(ChildManifests)
