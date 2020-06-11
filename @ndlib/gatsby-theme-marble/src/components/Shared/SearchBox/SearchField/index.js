import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { updateInput } from 'store/actions/searchActions'

// You should only have one search field on a page.
export const SearchField = ({ submitSearch, searchReducer, searchPath, dispatch, className, location }) => {
  const { t } = useTranslation()
  const { rawInput } = searchReducer
  const fieldLabel = t('common:search.prompt')
  return (
    <>
      <label
        htmlFor='searchField'
        className='accessibilityOnly'
      >{fieldLabel}
      </label>
      <input
        id='searchField'
        name='searchField'
        type='text'
        className={className}
        autoComplete='off'
        placeholder={fieldLabel}
        onChange={(e) => dispatch(updateInput(e.target.value))}
        value={decodeURIComponent(rawInput)}
        onKeyDown={(e) => {
          // Submit on enter key press
          if (e.keyCode === 13) {
            submitSearch(location, rawInput, searchPath)
          }
        }}
      />
    </>
  )
}

SearchField.propTypes = {
  className: PropTypes.string.isRequired,
  submitSearch: PropTypes.func.isRequired,
  searchReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  searchPath: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(SearchField)
