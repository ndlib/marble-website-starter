import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const SearchButton = ({ searchReducer, submitSearch, searchPath, className, location }) => {
  const { rawInput } = searchReducer
  return (
    <div
      role='button'
      className={className}
      onClick={() => submitSearch(location, rawInput, searchPath)}
    />
  )
}

SearchButton.propTypes = {
  className: PropTypes.string.isRequired,
  searchReducer: PropTypes.object.isRequired,
  submitSearch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  searchPath: PropTypes.string.isRequired,
}

SearchButton.defaultProps = {
  white: false,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(SearchButton)
