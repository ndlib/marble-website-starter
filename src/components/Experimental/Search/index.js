import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'components/Layout'
import SearchPreMain from './SearchPreMain'
import SearchTools from './SearchTools'
import SearchResults from './SearchResults'
import { ReactiveBase } from '@appbaseio/reactivesearch'

export const components = ['SearchResult', 'SearchSensor', 'DynamicYearSlider', 'CampusLocationAggregate', 'LanguageListAggregate', 'LocationListAggregate', 'FormatListAggregate']

export const Search = ({ searchBase, location, displayReducer }) => {
  return (
    <ReactiveBase
      app={searchBase.app}
      url={searchBase.url}>
      <Layout
        location={location}
        preMain={<SearchPreMain components={components} />}
        aside={<SearchTools components={components} />}
      >
        <SearchResults
          location={location}
          components={components}
          displayReducer={displayReducer}
        />
      </Layout>
    </ReactiveBase>
  )
}

Search.propTypes = {
  searchBase: PropTypes.shape({
    app: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
  displayReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(Search)
