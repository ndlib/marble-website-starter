import React from 'react'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import HeroBox from '@ndlib/gatsby-theme-marble/src/components/Shared/HeroBox'
import { customQueryBuilder } from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchFilterBox'

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

export default SearchFilterBox
