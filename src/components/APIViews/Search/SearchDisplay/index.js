import React from 'react'
import PropTypes from 'prop-types'
import PerPage from './PerPage'
import PageNum from './PageNum'
import Results from './Results'

export const SearchDisplay = ({ location }) => {
  return (
    <div>
      <PerPage location={location} />
      <PageNum location={location} />
      <Results location={location} />
      <PageNum location={location} />
    </div>
  )
}

SearchDisplay.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SearchDisplay
