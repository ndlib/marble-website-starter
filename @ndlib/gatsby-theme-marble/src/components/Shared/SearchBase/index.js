import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import typy from 'typy'
import {
  SearchkitProvider,
  SearchkitManager,
} from 'searchkit'

const SearchBase = ({ children, defaultSearch }) => {
  const { marbleConfiguration } = useStaticQuery(query)
  const searchBase = {
    url: typy(marbleConfiguration, 'search.url').safeString,
    app: typy(marbleConfiguration, 'search.index').safeString,
  }
  if (!typy(searchBase, 'url').isString || !typy(searchBase, 'app').isString) {
    return (
      <>{children}</>
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
      <>
        {children}
      </>
    </SearchkitProvider>
  )
}
SearchBase.propTypes = {
  children: PropTypes.node.isRequired,
  defaultSearch: PropTypes.object,
}

export default SearchBase

export const query = graphql`
query {
  marbleConfiguration {
    search {
      url
      index
    }
  }
}
`
