import React from 'react'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import style from './style.module.css'

const SearchFilterBox = () => {
  const fields = ['name', 'creator', 'allMetadata']
  return (
    <div className={style.searchHead}>
      <SearchBox
        queryFields={fields}
        queryBuilder={customQueryBuilder}
      />
      <SelectedFilters />
      <ResetFilters />
    </div>
  )
}

const customQueryBuilder = (query, options) => {
  return {
    bool : {
      should : [
        {
          multi_match: {
            query: query,
            fields: [
              'name^3',
              'creator^2',
              'allMetadata',
            ],
            slop: 5,
            type: 'phrase',
            boost: 4,
          },
        },
        {
          multi_match: {
            query: query,
            fields: [
              'name^2',
              'creator^1',
              'allMetadata',
            ],
          },
        },
      ],
    },
  }
}

export default SearchFilterBox
