import React from 'react'
import PropTypes from 'prop-types'
import CardGroup from 'components/Shared/CardGroup'
import SearchAdditionalTools from 'components/Shared/SearchTools/SearchAdditionalTools'
import HitResult from './HitResult'

const HitDisplay = ({ hits, displayContext }) => {
  const referal = { type: 'search', query: window.location.search }
  return (
    <CardGroup
      defaultDisplay='list'
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
}
HitDisplay.defaultProps = {
  defaultDisplay: 'SEARCH_PAGE',
}

export default HitDisplay

export const HitList = ({ hits, displayContext }) => {
  return <HitDisplay hits={hits} defaultDisplay='SEARCH_PAGE' displayContext={displayContext} />
}
HitList.propTypes = {
  hits: PropTypes.array,
}

export const HitGrid = ({ hits, displayContext }) => {
  return <HitDisplay hits={hits} defaultDisplay='COLLECTION_PAGE' displayContext={displayContext} />
}
HitGrid.propTypes = {
  hits: PropTypes.array,
}
