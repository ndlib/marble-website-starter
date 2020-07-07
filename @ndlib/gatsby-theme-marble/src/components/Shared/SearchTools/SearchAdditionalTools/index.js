/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import SearchSortingSelector from 'components/Shared/SearchTools/SearchSortingSelector'
import { HitsStats } from 'searchkit'

export const SearchAdditionalTools = () => {
  return (
    <>
      <div sx={{
        display: 'inline-block',
        textAlign: 'left',
        width: 'calc(100% - 270px)',
        verticalAlign: 'top',
      }}
      >
        <HitsStats />
      </div>
      <SearchSortingSelector />
    </>
  )
}

export default SearchAdditionalTools
