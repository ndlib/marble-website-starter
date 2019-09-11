/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Link from 'components/Internal/Link'
import { jsx } from 'theme-ui'
import queryString from 'query-string'
import SearchButton from './SearchButton'
import SearchField from './SearchField'
import style from './style.module.css'
import helpIcon from 'assets/icons/svg/baseline-help_outline-24px.svg'

// The location prop is only available from Gatsby in components inside the 'page' and 'template' directories and must be passed down.
const SearchBox = ({ location, message }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            searchPath
          }
        }
      }
    `
  )
  const displayMessage = message ? <div className={style.message}>{message}</div> : null
  const searchPath = site.siteMetadata.searchPath || 'search'
  return (
    <section
      className={style.searchComponent}
      sx={{ backgroundColor: 'highlightWithOpacity' }}
    >
      {displayMessage}
      <div className={style.searchBox}>
        <SearchField
          className={style.searchField}
          location={location}
          searchPath={searchPath}
          submitSearch={submitSearch}

        />
        <SearchButton
          className={style.searchButton}
          location={location}
          searchPath={searchPath}
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
  message: PropTypes.string,
}

export default SearchBox

export const submitSearch = (location, rawInput, searchPath) => {
  const qs = queryString.parse(location.search)
  qs.q = `${rawInput}`
  navigate(`/${searchPath}?${queryString.stringify(qs)}`)
}
