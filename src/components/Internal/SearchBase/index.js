import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  SearchkitProvider,
  SearchkitManager,
} from 'searchkit'

const SearchBase = ({ children, data }) => {
  const searchBase = typy(data, 'site.siteMetadata.searchBase').safeObject
  const sk = new SearchkitManager(`${searchBase.url}/${searchBase.app}`)
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
  data: PropTypes.object.isRequired,
}

export default SearchBase
