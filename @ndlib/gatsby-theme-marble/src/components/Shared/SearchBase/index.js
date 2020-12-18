import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  SearchkitProvider,
  SearchkitManager,
} from 'searchkit'

const SearchBase = ({ children, defaultSearch }) => {
  const searchBase = {
    url: process.env.SEARCH_URL,
    app: process.env.SEARCH_INDEX,
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
