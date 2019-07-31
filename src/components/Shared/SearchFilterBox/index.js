import React from 'react'
import {
  DataSearch,
  SelectedFilters,
} from '@appbaseio/reactivesearch'
import { components } from 'components/Internal/SearchBase'
import style from './style.module.css'

const SearchFilterBox = () => {
  return (
    <div className={style.searchHead}>
      <DataSearch
        componentId='SearchSensor'
        dataField={['title', 'creator', 'fulltext', 'type', 'systemId']}
        filterLabel='Search'
        highlight
        highlightField={['title', 'creator', 'systemId']}
        react={{ 'and': components }}
        URLParams
      />
      <SelectedFilters />
    </div>
  )
}

export default SearchFilterBox
