import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import searchImage from 'assets/icons/svg/baseline-search-24px.svg'
import searchImageWhite from 'assets/icons/svg/baseline-search-24px-white.svg'

export const SearchButton = ({ white, searchReducer, submitSearch, className }) => {
  const { rawInput } = searchReducer
  return (
    <button
      className={className}
      onClick={() => submitSearch(window.location, rawInput)}
    >
      <img
        className='searchIcon'
        src={white ? searchImageWhite : searchImage}
        alt='Search'
        value='submit' />
    </button>
  )
}

SearchButton.propTypes = {
  className: PropTypes.string.isRequired,
  searchReducer: PropTypes.object.isRequired,
  submitSearch: PropTypes.func.isRequired,
  white: PropTypes.bool.isRequired,
}

SearchButton.defaultProps = {
  white: false,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(SearchButton)
