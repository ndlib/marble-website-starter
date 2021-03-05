import React from 'react'
import PropTypes from 'prop-types'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import SearchAdditionalTools from 'components/Shared/SearchTools/SearchAdditionalTools'
import HitResult from './HitResult'

const HitDisplay = ({ hits, defaultDisplay }) => {
  const referal = { type: 'search', query: window.location.search }
  return (
    <DisplayViewToggle
      defaultDisplay={defaultDisplay}
      extraControls={SearchAdditionalTools}
    >
      {
        hits ? hits.map(
          (hit, index) => (
            <HitResult
              hit={hit}
              key={index}
              referal={referal}
            />
          ),
        ) : null
      }
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
  return <HitDisplay hits={hits} defaultDisplay='SEARCH_PAGE' />
}
HitList.propTypes = {
  hits: PropTypes.array,
}

export const HitGrid = ({ hits }) => {
  return <HitDisplay hits={hits} defaultDisplay='COLLECTION_PAGE' />
}
HitGrid.propTypes = {
  hits: PropTypes.array,
}
