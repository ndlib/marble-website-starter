import React from 'react'
import PropTypes from 'prop-types'
import SearchBase from 'components/Internal/SearchBase'
import SearchResults from 'components/Shared/SearchTools/SearchResults'

const SavedSearch = ({ terms }) => {
  return (
    <SearchBase terms={terms}>
      <SearchResults defaultDisplay='grid' />
    </SearchBase>

  )
}

SavedSearch.propTypes = {
  terms: PropTypes.string,
}

SavedSearch.defaultProps = {
  terms: '',
}
export default SavedSearch
