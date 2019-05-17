import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import queryString from 'query-string'
import Layout from 'components/Layout'
import Search from 'components/APIViews/Search'
import SearchBox from 'components/Shared/SearchBox'
import Seo from 'components/Shared/Seo'
import Card from 'components/Shared/Card'
import {
  submitSearch,
  STATUS_SEARCH_FETCHING,
} from 'store/actions/searchActions'
import { ReactiveBase, DataSearch, MultiList, SingleDataList, ReactiveList, DynamicRangeSlider, MultiDropdownList, MultiDataList, SelectedFilters } from '@appbaseio/reactivesearch'

const SearchPage = ({ location }) => {
  return (
    <ReactiveBase
      app="website"
      url="https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com">

      <Layout
        title={''}
        preMain={
          <React.Fragment>
            <DataSearch
              componentId="SearchSensor"
              dataField={["title", "creator", "fulltext", "type"]}
              filterLabel="Search"
              react={{
                  "and": ["FormatListAggregate", "CampusLocationAggregate", "DynamicYearSlider", "SearchResult", 'LanguageListAggregate', 'LocationListAggregate']
              }}
              URLParams={true}
            />
            <SelectedFilters />
          </React.Fragment>
        }
        location={location}
        aside={
          <React.Fragment>
            <SingleDataList
              componentId="CampusLocationAggregate"
              dataField="repository.keyword"
              title="Campus Location"
              filterLabel="Campus Location"
              showSearch={false}
              URLParams={true}
              data={
                [{
                  label: "Rare Books and Special Collections",
                  value: "SPEC RBSC"
                }, {
                  label: "Snite Museum of Art",
                  value: "SNITE"
                }, {
                  label: "University Archives",
                  value: "ARCHIVES"
                }]
              }
              react={{
                  "and": ["FormatListAggregate", "SearchSensor", "DynamicYearSlider", "SearchResult", 'LanguageListAggregate', 'LocationListAggregate', 'SearchSensor']
              }}
            />
            <MultiList
              componentId="FormatListAggregate"
              dataField="type.keyword"
              title="Format"
              size={7}
              filterLabel="Format"
              showSearch={false}
              react={{
                  "and": ["SearchResult", "SearchSensor", "DynamicYearSlider", "CampusLocationAggregate", 'LanguageListAggregate', 'LocationListAggregate', 'SearchSensor']
              }}
              URLParams={true}
            />
            <MultiDropdownList
              componentId="LocationListAggregate"
              dataField="place.keyword"
              title="Places"
              filterLabel="Places"
              size={15}
              sortBy="count"
              showSearch={false}
              react={{
                  "and": ["FormatListAggregate", "SearchSensor", "DynamicYearSlider", "CampusLocationAggregate", 'LanguageListAggregate', 'SearchResult', 'SearchSensor']
              }}
              URLParams={true}
            />
            <DynamicRangeSlider
              componentId="DynamicYearSlider"
              dataField="year"
              title="Date"
              filterLabel="Date"
              stepValue={5}
              react={{
                  "and": ["FormatListAggregate", "SearchSensor", "SearchResult", "CampusLocationAggregate", 'LanguageListAggregate', 'LocationListAggregate', 'SearchSensor']
              }}
              URLParams={true}
            />
            <MultiDropdownList
              componentId="LanguageListAggregate"
              dataField="language.keyword"
              title="Language"
              sortBy="count"
              filterLabel="Language"
              showSearch={false}
              react={{
                  "and": ["FormatListAggregate", "SearchSensor", "DynamicYearSlider", "CampusLocationAggregate", 'SearchResult', 'LocationListAggregate', 'SearchSensor']
              }}
              URLParams={true}
            />
          </React.Fragment>
        }
      >
          <ReactiveList
              componentId="SearchResult"
              dataField={"title"}
              react={{
                  "and": ["FormatListAggregate", "SearchSensor", "DynamicYearSlider", "CampusLocationAggregate", 'LanguageListAggregate', 'LocationListAggregate']
              }}
              excludeFields="fulltext"
              renderItem={(res) => {

                return(
                  <Card
                    key={res.id}
                    label={res.title}
                    image={res.thumbnail}
                    target={res.url}
                    location={location}
                    referal={{ type: 'search', query: location.search }}
                  >
                    <div className='description'>{res.description}</div>
                    <div>{res.creator}</div>
                  </Card>
                )
              } }
          />
      </Layout>
    </ReactiveBase>
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
