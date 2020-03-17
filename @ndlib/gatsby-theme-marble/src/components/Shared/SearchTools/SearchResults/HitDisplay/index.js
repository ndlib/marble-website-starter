import React from 'react'
import PropTypes from 'prop-types'
import ManifestCard from 'components/Shared/ManifestCard'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import typy from 'typy'

const HitDisplay = ({ hits, defaultDisplay }) => {
  return (
    <DisplayViewToggle
      defaultDisplay={defaultDisplay}
    >
      {hits.map((hit, index) => (
        <ManifestCard
          iiifManifest={hit._id}
          key={index}
        >
          {Object.values(typy(hit, 'highlight').safeObject).map((row, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: row }} />
          ))}
        </ManifestCard>
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
HitList.propTypes = {
  hits: PropTypes.array,
}

export const HitGrid = ({ hits }) => {
  return <HitDisplay hits={hits} defaultDisplay={'COLLECTION_PAGE'} />
}
HitGrid.propTypes = {
  hits: PropTypes.array,
}
