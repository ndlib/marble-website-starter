import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  SearchkitProvider,
  SearchkitManager,
  SimpleQueryString,
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
  if (defaultSearch && defaultSearch[0]) {
    const tag = defaultSearch[0].tag.split(':')
    sk.addDefaultQuery((query) => {
      return query.addQuery(SimpleQueryString(tag[1], { fields: [tag[0]] }))
    })
  }
  /*
  if (range) {
    const s = range.split('-')
    sk.addDefaultQuery((query) => {
      return query.addQuery(RangeQuery('year', { gte: s[0], lte: s[1] }))
    })
  }
  */
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
  defaultSearch: PropTypes.array,
}

export default SearchBase
