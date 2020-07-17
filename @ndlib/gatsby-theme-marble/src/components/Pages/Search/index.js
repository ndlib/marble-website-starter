import React from 'react'
import SearchBase from 'components/Shared/SearchBase'
import SearchFilterBox from 'components/Shared/SearchTools/SearchFilterBox'
import SearchResults from 'components/Shared/SearchTools/SearchResults'
// import SearchSortingSelector from 'components/Shared/SearchTools/SearchSortingSelector'
// import SearchDynamicRangeFilter from 'components/Shared/SearchTools/SearchDynamicRangeFilter'
// import SearchMenuFilter from 'components/Shared/SearchTools/SearchMenuFilter'
import SearchRefinementListFilter from 'components/Shared/SearchTools/SearchRefinementListFilter'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'

const Search = () => {
  return (
    <SearchBase>
      <SearchFilterBox />
      <MultiColumn columns='4'>
        <Column>
          <SearchRefinementListFilter
            field='centuryTag.keyword'
            label='Time Period'
            operator='OR'
            sort='a-z'
          />
          <SearchRefinementListFilter
            field='repository.keyword'
            label='Campus Location'
            operator='OR'
          />
          <SearchRefinementListFilter
            field='formatTag.keyword'
            label='Format'
            operator='OR'
          />
          <SearchRefinementListFilter
            field='themeTag.keyword'
            label='Keywords'
            operator='OR'
            sort='default'
            size='10'
          />
        </Column>
        <Column colSpan='3'>
          <SearchResults defaultDisplay='list' />
        </Column>
      </MultiColumn>
    </SearchBase>
  )
}

export default Search