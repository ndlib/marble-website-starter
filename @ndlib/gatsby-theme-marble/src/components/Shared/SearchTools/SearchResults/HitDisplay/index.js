import React from 'react'
import PropTypes from 'prop-types'
import CardGroup from 'components/Shared/CardGroup'
import SearchAdditionalTools from 'components/Shared/SearchTools/SearchAdditionalTools'
import HitResult from './HitResult'

const HitDisplay = ({ hits, defaultDisplay, displayContext }) => {
  const referal = { type: 'search', query: window.location.search }
  return (
    <CardGroup
      defaultDisplay={defaultDisplay}
      toggleGroup='search'
      extraControls={displayContext === 'searchList' ? SearchAdditionalTools : null}
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
    </CardGroup>
  )
}

HitDisplay.propTypes = {
  hits: PropTypes.array,
  defaultDisplay: PropTypes.string,
  displayContext: PropTypes.string,
}
HitDisplay.defaultProps = {
  defaultDisplay: 'list',
}

export default HitDisplay

export const HitList = ({ hits, displayContext }) => {
  return <HitDisplay hits={hits} defaultDisplay='list' displayContext={displayContext} />
}
HitList.propTypes = {
  hits: PropTypes.array,
  displayContext: PropTypes.string,
}

export const HitGrid = ({ hits, displayContext }) => {
  return <HitDisplay hits={hits} defaultDisplay='grid' displayContext={displayContext} />
}
HitGrid.propTypes = {
  hits: PropTypes.array,
  displayContext: PropTypes.string,
}
