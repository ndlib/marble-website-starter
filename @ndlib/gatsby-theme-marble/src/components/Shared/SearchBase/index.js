import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  SearchkitProvider,
  SearchkitManager,
} from 'searchkit'

const SearchBase = ({ children, defaultSearch }) => {
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
  if (!typy(searchBase, 'url').isString || !typy(searchBase, 'app').isString) {
    return (
      <React.Fragment>{children}</React.Fragment>
    )
  }
  const sk = new SearchkitManager(`${searchBase.url}/${searchBase.app}`)
  if (defaultSearch) {
    sk.addDefaultQuery((query) => {
      return query.addQuery(defaultSearch)
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
  defaultSearch: PropTypes.object,
}

export default SearchBase
