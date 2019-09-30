import React from 'react'
// import PropTypes from 'prop-types'
import {
  SortingSelector,
} from 'searchkit'

const SearchSortingSelector = () => {
  return (
    <SortingSelector
      options={[
        { label:'Title (a-z)', field:'name.keyword', order:'asc', defaultOption:true },
        { label:'Title (z-a)', field:'name.keyword', order:'desc' },
        { label:'Newest Site Additions', field:'year', order:'desc' },
        { label:'Date (newest)', field:'year', order:'asc', key:'earliest' },
        { label:'Date (oldest)', field:'type.keyword', order:'desc' },
      ]} />
  )
}

SearchSortingSelector.propTypes = {
}

SearchSortingSelector.defaultProps = {
}

export default SearchSortingSelector
