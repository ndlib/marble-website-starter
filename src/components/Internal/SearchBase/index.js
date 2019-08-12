import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  SearchkitProvider,
  SearchkitManager,
  SimpleQueryString,
} from 'searchkit'

const SearchBase = ({ children, terms }) => {
  const { site } = useStaticQuery(
    graphql`
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
  )
  const searchBase = typy(site, 'siteMetadata.searchBase').safeObject
  const sk = new SearchkitManager(`${searchBase.url}/${searchBase.app}`)
  if (terms) {
    sk.addDefaultQuery((query) => {
      return query.addQuery(SimpleQueryString(terms))
    })
  }
  return (
    <SearchkitProvider searchkit={sk}>
      <React.Fragment>
        {children}
      </React.Fragment>
    </SearchkitProvider>
  )
}
SearchBase.propTypes = {
  children: PropTypes.node.isRequired,
  terms: PropTypes.string,
}

export default SearchBase
