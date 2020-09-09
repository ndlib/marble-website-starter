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
import Pager from './Pager'

export const SearchResults = ({ defaultDisplay }) => {
  let displayComponent = HitGrid
  if (defaultDisplay === 'list') {
    displayComponent = HitList
  }
  return (
    <>
      <Hits
        hitsPerPage={50}
        sourceFilter={['name']}
        highlightFields={['allMetadata.folded', 'name.folded', 'creator.folded']}
        listComponent={displayComponent}
        scrollTo='#gatsby-focus-wrapper'
      />
      <NoHits
        suggestionsField='name'
      />
      <InitialLoader component={Loading} />
      <Pager />
    </>
  )
}

SearchResults.propTypes = {
  defaultDisplay: PropTypes.string,
}

SearchResults.defaultProps = {
  defaultDisplay: 'list',
}
export default SearchResults
