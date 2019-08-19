import React from 'react'
import PropTypes from 'prop-types'
import {
  Hits,
  NoHits,
  InitialLoader,
} from 'searchkit'
import Loading from 'components/Internal/Loading'
import {
  HitList,
  HitGrid,
} from './HitDisplay'

export const SearchResults = ({ defaultDisplay }) => {
  let displayComponent = HitGrid
  if (defaultDisplay === 'list') {
    displayComponent = HitList
  }
  return (
    <React.Fragment>
      <Hits
        hitsPerPage={50}
        sourceFilter={['name']}
        listComponent={displayComponent}
      />
      <NoHits
        suggestionsField='name'
      />
      <InitialLoader component={Loading} />
    </React.Fragment>
  )
}

SearchResults.propTypes = {
  defaultDisplay: PropTypes.string,
}

SearchResults.defaultProps = {
  defaultDisplay: 'list',
}
export default SearchResults
