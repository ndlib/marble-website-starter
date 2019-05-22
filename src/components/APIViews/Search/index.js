import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SearchDisplay from './SearchDisplay'
import Loading from 'components/Shared/Loading'
import {
  STATUS_SEARCH_EMPTY,
  STATUS_SEARCH_READY,
  STATUS_SEARCH_ERROR,
} from 'store/actions/searchActions'


// The location prop is only available from Gatsby in components inside the 'page' and 'template' directories and must be passed down.
export const Search = ({ searchReducer, location }) => {
  switch (searchReducer.status) {
    case STATUS_SEARCH_EMPTY:
      return <div>No Results Found</div>
    case STATUS_SEARCH_READY:
      return <SearchDisplay location={location} />
    case STATUS_SEARCH_ERROR:
      return <div>An Error Has Occurred.</div>
    default:
      return <Loading />
  }
}

Search.propTypes = {
  location: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(Search)
