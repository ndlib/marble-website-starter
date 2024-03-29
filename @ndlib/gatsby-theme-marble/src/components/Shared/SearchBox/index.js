import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import queryString from 'query-string'
import SearchButton from './SearchButton'
import SearchField from './SearchField'

const SearchBox = ({ location, boxLabel }) => {
  return (
    <div className='sk-search-box'>
      <SearchButton
        aria-label='Search tool'
        className='sk-search-box__icon'
        location={location}
        searchPath='search'
        submitSearch={submitSearch}
      />
      <SearchField
        className='sk-search-box__text'
        location={location}
        searchPath='search'
        submitSearch={submitSearch}
        boxLabel={boxLabel}
      />
    </div>
  )
}

SearchBox.propTypes = {
  location: PropTypes.object.isRequired,
  boxLabel: PropTypes.string,
}

export default SearchBox

export const submitSearch = (location, rawInput, searchPath) => {
  const qs = queryString.parse(location.search)
  qs.q = `${rawInput}`
  navigate(`/${searchPath}?${queryString.stringify(qs)}`)
}
