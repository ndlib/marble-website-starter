import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Link from 'components/Internal/Link'
import queryString from 'query-string'
import SearchButton from './SearchButton'
import SearchField from './SearchField'
import style from './style.module.css'
import helpIcon from 'assets/icons/svg/baseline-help_outline-24px.svg'

// The location prop is only available from Gatsby in components inside the 'page' and 'template' directories and must be passed down.
const SearchBox = ({ location }) => {
  return (
    <section className={style.searchComponent} >
      <div className={style.searchBox}>
        <SearchField
          className={style.searchField}
          location={location}
          submitSearch={submitSearch}

        />
        <SearchButton
          className={style.searchButton}
          location={location}
          submitSearch={submitSearch}
        />
      </div>
      <div className={style.advancedSearch}>
        <Link to='/help/search-tips'>
          <img
            src={helpIcon}
            alt='help'
            className='tipImg'
          />
        </Link>
      </div>
    </section>
  )
}

SearchBox.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SearchBox

export const submitSearch = (location, rawInput) => {
  const qs = queryString.parse(location.search)
  qs.terms = rawInput
  qs.page = qs.page || 1
  qs.perpage = qs.perpage || 12
  navigate(`/search?${queryString.stringify(qs)}`)
}
