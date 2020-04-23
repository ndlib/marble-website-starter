import React from 'react'
import { SortingSelector } from 'searchkit'

const SearchSortingSelector = () => {
  return (
    <SortingSelector
      options={[
        { label:'Relevance', field:'_score', order:'desc', defaultOption:true },
        { label:'Title (a-z)', field:'name.keyword', order:'asc' },
        { label:'Title (z-a)', field:'name.keyword', order:'desc' },
        { label:'Date (newest)', field:'lowestSearchRange', order:'desc' },
        { label:'Date (oldest)', field:'lowestSearchRange', order:'asc' },
      ]} />
  )
}

export default SearchSortingSelector
