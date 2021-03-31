/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Flex, Box } from 'theme-ui'
import SearchSortingSelector from 'components/Shared/SearchTools/SearchSortingSelector'
import { HitsStats } from 'searchkit'

export const SearchAdditionalTools = () => {
  return (
    <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
      <Box sx={{
        textAlign: 'left',
        verticalAlign: 'top',
      }}
      >
        <HitsStats />
      </Box>
      <Box>
        <SearchSortingSelector />
      </Box>
    </Flex>
  )
}

export default SearchAdditionalTools
