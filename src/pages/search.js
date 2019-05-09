import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import queryString from 'query-string'
import Layout from 'components/Layout'
import Search from 'components/APIViews/Search'
import SearchBox from 'components/Shared/SearchBox'
import Seo from 'components/Shared/Seo'
import {
  submitSearch,
  STATUS_SEARCH_FETCHING,
} from 'store/actions/searchActions'

const SearchPage = ({ location }) => {
  return (
    <Layout
      title={'Search Results'}
      preMain={
        <React.Fragment>
          <Seo title='Search' />
          <SearchBox location={location} />
        </React.Fragment>
      }
    >
      <Search location={location} />
    </Layout>
  )
}

SearchPage.propTypes = {
  location: PropTypes.object,
}
const mapStateToProps = (state) => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const searchBase = ownProps.data.site.siteMetadata.primoSearchBaseURL
  const values = queryString.parse(ownProps.location.search)
  if (shouldDispatchSearch(stateProps.searchReducer, values.terms, stateProps.searchReducer.page, values.page, values.perpage)) {
    dispatchProps.dispatch(
      submitSearch(searchBase, values.perpage, values.terms, values.page || 1)
    )
  }
  return { ...stateProps, ...dispatchProps, ...ownProps }
}

export const shouldDispatchSearch = (searchReducer, terms, page, targetPage, perpage) => {
  // Not currently fetching
  // Has some terms
  // Current page of results is changing or terms are changing
  return (
    searchReducer.status !== STATUS_SEARCH_FETCHING &&
    terms &&
    (
      parseInt(page, 10) !== parseInt(targetPage, 10) ||
      searchReducer.terms !== terms ||
      searchReducer.perpage !== parseInt(perpage, 10)
    )
  )
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SearchPage)

export const query = graphql`
  query {
    site {
      siteMetadata {
        primoSearchBaseURL
      }
    }
  }
`
