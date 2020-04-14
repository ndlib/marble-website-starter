import React from 'react'
import { SortingSelector } from 'searchkit'

const SearchSortingSelector = () => {
  return (
    <SortingSelector
      options={[
        { label:'Relevance', field:'_score', order:'desc', defaultOption:true },
        { label:'Title (a-z)', field:'name.keyword', order:'asc' },
        { label:'Title (z-a)', field:'name.keyword', order:'desc' },
        { label:'Newest Site Additions', field:'year', order:'desc' },
        { label:'Date (newest)', field:'year', order:'asc', key:'earliest' },
        { label:'Date (oldest)', field:'type.keyword', order:'desc' },
      ]} />
  )
}

export default SearchSortingSelector
