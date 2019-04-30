import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateInput } from 'store/actions/searchActions'

// You should only have one search field on a page.
export const SearchField = ({ submitSearch, searchReducer, dispatch, className, location }) => {
  const { rawInput } = searchReducer
  const fieldLabel = 'Search the Collections'
  return (
    <React.Fragment>
      <label
        htmlFor='searchField'
        className='accessibilityOnly'
      >{fieldLabel}</label>
      <input
        id='searchField'
        type='text'
        className={className}
        placeholder={fieldLabel}
        onChange={(e) => dispatch(updateInput(e.target.value))}
        value={decodeURIComponent(rawInput)}
        onKeyDown={(e) => {
        // Submit on enter key press
          if (e.keyCode === 13) {
            submitSearch(location, rawInput)
          }
        }}
      />
    </React.Fragment>
  )
}

SearchField.propTypes = {
  className: PropTypes.string.isRequired,
  submitSearch: PropTypes.func.isRequired,
  searchReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(SearchField)
