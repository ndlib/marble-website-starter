import React from 'react'
import PropTypes from 'prop-types'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import PerPage from './PerPage'
import PageNum from './PageNum'
import Results from './Results'
import {
  SEARCH_PAGE,
} from 'store/actions/displayActions'

export const SearchDisplay = ({ location }) => {
  return (
    <DisplayViewToggle
      page={SEARCH_PAGE}
    >
      <PerPage location={location} />
      <PageNum location={location} />
      <Results location={location} />
      <PageNum location={location} />
    </DisplayViewToggle>
  )
}

SearchDisplay.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SearchDisplay
