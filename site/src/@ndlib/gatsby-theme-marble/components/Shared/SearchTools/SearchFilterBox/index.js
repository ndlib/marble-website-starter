import React from 'react'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import HeroBox from 'components/shared/HeroBox'

import banner from 'assets/images/banner.swirl.png'

const SearchFilterBox = () => {
  const fields = ['name', 'creator', 'allMetadata']
  return (
    <HeroBox backgroundImage={banner}>
      <SearchBox
        queryFields={fields}
        queryBuilder={customQueryBuilder}
      />
      <SelectedFilters />
      <ResetFilters />
    </HeroBox>
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
