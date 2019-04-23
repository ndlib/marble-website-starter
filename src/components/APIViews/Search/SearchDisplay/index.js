import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import PerPage from './PerPage'
import PageNum from './PageNum'
import Results from './Results'

export const SearchDisplay = ({ searchReducer }) => {
  return (
    <DisplayViewToggle>
      <PerPage />
      <PageNum />
      <Results />
    </DisplayViewToggle>
  )
}

SearchDisplay.propTypes = {
  searchReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(SearchDisplay)
