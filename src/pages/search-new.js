import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Search from 'components/Experimental/Search'

const SearchPage = ({ data, location }) => {
  return <Search
    searchBase={data.site.siteMetadata.searchBase}
    location={location}
  />
}

SearchPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default SearchPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        searchBase {
          app
          url
        }
      }
    }
  }
`
