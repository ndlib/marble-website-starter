import React from 'react'
import { connect } from 'react-redux'
import SearchDisplay from './SearchDisplay'
import Loading from 'components/Shared/Loading'

import {
  STATUS_SEARCH_EMPTY,
  STATUS_SEARCH_READY,
  STATUS_SEARCH_ERROR,
} from 'store/actions/searchActions'

export const Search = ({ searchReducer }) => {
  switch (searchReducer.status) {
    case STATUS_SEARCH_EMPTY:
      return <div>No Results Found</div>
    case STATUS_SEARCH_READY:
      return <SearchDisplay />
    case STATUS_SEARCH_ERROR:
      return <div>An Error Has Occurred.</div>
    default:
      return <Loading />
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(Search)
