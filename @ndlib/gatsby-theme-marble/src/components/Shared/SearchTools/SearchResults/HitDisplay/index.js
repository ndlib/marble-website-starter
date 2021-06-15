import React from 'react'
import PropTypes from 'prop-types'
import CardGroup from 'components/Shared/CardGroup'
import SearchAdditionalTools from 'components/Shared/SearchTools/SearchAdditionalTools'
import HitResult from './HitResult'

const HitDisplay = ({ hits, defaultDisplay, extraControls }) => {
  const referal = { type: 'search', query: window.location.search }
  return (
    <CardGroup
      defaultDisplay={defaultDisplay}
      toggleGroup='search'
      allowToggle
      extraControls={extraControls}
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

export const HitList = ({ hits, extraControls }) => {
  return <HitDisplay hits={hits} defaultDisplay='list' extraControls={extraControls} />
}
HitList.propTypes = {
  hits: PropTypes.array,
  displayContext: PropTypes.string,
}

export const HitGrid = ({ hits, extraControls }) => {
  return <HitDisplay hits={hits} defaultDisplay='grid' extraControls={extraControls} />
}
HitGrid.propTypes = {
  hits: PropTypes.array,
  displayContext: PropTypes.string,
}
