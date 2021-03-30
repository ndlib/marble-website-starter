import React from 'react'
import SearchBase from 'components/Shared/SearchBase'
import SearchFilterBox from 'components/Shared/SearchTools/SearchFilterBox'
import SearchResults from 'components/Shared/SearchTools/SearchResults'
import SearchRefinementListFilter from 'components/Shared/SearchTools/SearchRefinementListFilter'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import { TagFilterConfig } from 'searchkit'

const Search = () => {
  const displayContext = 'searchList'
  return (
    <SearchBase>
      <SearchFilterBox />
      <MultiColumn columns='4'>
        <Column>
          <TagFilterConfig field='creator.keyword' title='Creator' id='creator' />
          <TagFilterConfig field='collection.keyword' title='Collection' id='collection' />

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
          <SearchRefinementListFilter
            field='language.keyword'
            label='Language'
            operator='OR'
            sort='default'
            size='4'
          />
        </Column>
        <Column colSpan='3'>
          <SearchResults defaultDisplay='list' displayContext={displayContext} />
        </Column>
      </MultiColumn>
    </SearchBase>
  )
}

export default Search
