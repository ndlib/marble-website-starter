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

export const SearchResults = ({ defaultDisplay, hitsPerPage, showPagination, scrollTo }) => {
  let displayComponent = HitGrid
  if (defaultDisplay === 'list') {
    displayComponent = HitList
  }
  return (
    <>
      <Hits
        hitsPerPage={hitsPerPage}
        sourceFilter={['name']}
        highlightFields={['allMetadata.folded', 'name.folded', 'creator.folded', 'identifier.idMatch']}
        listComponent={displayComponent}
        scrollTo={scrollTo}
      />
      <NoHits
        suggestionsField='name'
      />
      <InitialLoader component={Loading} />
      {showPagination ? <Pager /> : null}
    </>
  )
}

SearchResults.propTypes = {
  defaultDisplay: PropTypes.string,
  hitsPerPage: PropTypes.number,
  showPagination: PropTypes.bool,
  scrollTo: PropTypes.string,
}

SearchResults.defaultProps = {
  defaultDisplay: 'list',
  hitsPerPage: 50,
  showPagination: true,
  scrollTo: '#gatsby-focus-wrapper',
}
export default SearchResults
