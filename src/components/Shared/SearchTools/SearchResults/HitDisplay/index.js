import React from 'react'
import PropTypes from 'prop-types'
import ManifestCard from 'components/Shared/ManifestCard'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'

const HitDisplay = ({ hits, defaultDisplay }) => {
  return (
    <DisplayViewToggle
      defaultDisplay={defaultDisplay}
    >
      {hits.map((hit, index) => (
        <ManifestCard
          iiifManifest={hit._id}
          key={index}
        />
      ))}
    </DisplayViewToggle>
  )
}

HitDisplay.propTypes = {
  hits: PropTypes.array,
  defaultDisplay: PropTypes.string,
}
HitDisplay.defaultProps = {
  defaultDisplay: 'SEARCH_PAGE',
}

export default HitDisplay

export const HitList = ({ hits }) => {
  return <HitDisplay hits={hits} defaultDisplay={'SEARCH_PAGE'} />
}

export const HitGrid = ({ hits }) => {
  return <HitDisplay hits={hits} defaultDisplay={'COLLECTION_PAGE'} />
}
