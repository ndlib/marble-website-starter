import React from 'react'
import PropTypes from 'prop-types'
import {
  Hits,
  NoHits,
  InitialLoader,
} from 'searchkit'
import Loading from 'components/Shared/Loading'
import {
  HitList,
  HitGrid,
} from './HitDisplay'
import Pager from './Pager'
import { sourceFilter, highlightFields } from './searchSettings'

export const SearchResults = ({ defaultDisplay, hitsPerPage, showPagination, scrollTo, extraControls }) => {
  let displayComponent = HitGrid({ extraControls })
  if (defaultDisplay === 'list') {
    displayComponent = HitList({ extraControls })
  }
  return (
    <>
      <Hits
        hitsPerPage={hitsPerPage}
        sourceFilter={sourceFilter}
        highlightFields={highlightFields}
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
