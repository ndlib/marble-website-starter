/** @jsx jsx */
import React from 'react'
import { jsx, Flex, Box } from 'theme-ui'
import SearchBase from 'components/Shared/SearchBase'
import SearchFilterBox from 'components/Shared/SearchTools/SearchFilterBox'
import SearchResults from 'components/Shared/SearchTools/SearchResults'
import SearchRefinementListFilter from 'components/Shared/SearchTools/SearchRefinementListFilter'
import { TagFilterConfig } from 'searchkit'

const Search = () => {
  return (
    <SearchBase>
      <SearchFilterBox />
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', '25%'], px: '1rem', py: '1rem' }}>
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
        </Box>
        <Box sx={{ width: ['100%', '75%'], px: '1rem', py: '1rem' }}>
          <SearchResults defaultDisplay='list' />
        </Box>
      </Flex>
    </SearchBase>
  )
}

export default Search
