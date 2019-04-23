import React from 'react'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import PerPage from './PerPage'
import PageNum from './PageNum'
import Results from './Results'

export const SearchDisplay = () => {
  return (
    <DisplayViewToggle>
      <PerPage />
      <PageNum />
      <Results />
    </DisplayViewToggle>
  )
}

export default SearchDisplay
