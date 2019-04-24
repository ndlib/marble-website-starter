import React from 'react'
import { Link, navigate } from 'gatsby'
import queryString from 'query-string'
import SearchButton from './SearchButton'
import SearchField from './SearchField'
import style from './style.module.css'

import helpIcon from 'assets/icons/svg/baseline-help_outline-24px.svg'

const SearchBox = () => {
  return (
    <section className={style.searchComponent} >
      <div className={style.searchBox}>
        <SearchField
          className={style.searchField}
          submitSearch={submitSearch}
        />
        <SearchButton
          className={style.searchButton}
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

export const submitSearch = (location, rawInput) => {
  const qs = queryString.parse(location.search)
  qs.terms = rawInput
  qs.page = qs.page || 1
  qs.perpage = qs.perpage || 12
  navigate(`/search?${queryString.stringify(qs)}`)
}

export default SearchBox
