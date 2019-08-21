import React from 'react'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import style from './style.module.css'

const SearchFilterBox = () => {
  const fields = ['name', 'allMetadata']
  return (
    <div className={style.searchHead}>
      <SearchBox
        queryFields={fields}
      />
      <SelectedFilters />
      <ResetFilters />
    </div>
  )
}

export default SearchFilterBox
