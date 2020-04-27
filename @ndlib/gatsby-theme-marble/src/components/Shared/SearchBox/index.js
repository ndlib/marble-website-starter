import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import queryString from 'query-string'
import SearchButton from './SearchButton'
import SearchField from './SearchField'

const SearchBox = ({ location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            searchPath
          }
        }
      }
    `,
  )
  const searchPath = site.siteMetadata.searchPath || 'search'
  return (
    <div className='sk-search-box'>
      <SearchButton
        className='sk-search-box__icon'
        location={location}
        searchPath={searchPath}
        submitSearch={submitSearch}
      />
      <SearchField
        className='sk-search-box__text'
        location={location}
        searchPath={searchPath}
        submitSearch={submitSearch}
      />
    </div>
  )
}

SearchBox.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SearchBox

export const submitSearch = (location, rawInput, searchPath) => {
  const qs = queryString.parse(location.search)
  qs.q = `${rawInput}`
  navigate(`/${searchPath}?${queryString.stringify(qs)}`)
}
