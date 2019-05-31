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
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import Loading from 'components/Shared/Loading'

import {
  submitSearch,
  STATUS_SEARCH_FETCHING,
} from 'store/actions/searchActions'
import { ReactiveBase, DataSearch, MultiList, SingleDataList, ReactiveList, RangeSlider, MultiDropdownList, MultiDataList, SelectedFilters } from '@appbaseio/reactivesearch'

const components = ['SearchResult', 'SearchSensor', 'DynamicYearSlider', 'CampusLocationAggregate', 'LanguageListAggregate', 'LocationListAggregate', 'FormatListAggregate']

const SearchPage = ({ location }) => {
  return (
    <ReactiveBase
      app='website'
      url='https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com'>

      <Layout
        title={''}
        preMain={
          <React.Fragment>
            <DataSearch
              componentId='SearchSensor'
              dataField={['title', 'creator', 'fulltext', 'type', 'systemId']}
              filterLabel='Search'
              highlight
              highlightField={'title', 'creator', 'systemId'}
              react={{
                'and': components,
              }}
              URLParams
            />
            <SelectedFilters />
          </React.Fragment>
        }
        location={location}
        aside={
          <React.Fragment>
            <MultiList
              componentId='FormatListAggregate'
              dataField='type.keyword'
              title='Format'
              size={7}
              filterLabel='Format'
              showSearch={false}
              react={{
                'and': components,
              }}
              URLParams
            />
            <MultiDropdownList
              componentId='LocationListAggregate'
              dataField='place.keyword'
              title='Places'
              filterLabel='Places'
              size={15}
              sortBy='count'
              showSearch={false}
              react={{
                'and': components,
              }}
              URLParams
            />
            <RangeSlider
              componentId='DynamicYearSlider'
              dataField='year'
              title='Date'
              filterLabel='Date'
              stepValue={5}
              interval={5}
              react={{
                'and': components,
              }}
              rangeLabels={{
                'start': '1880',
                'end': '2010',
              }}
              range={{
                'start': 1880,
                'end': 2010,
              }}
              URLParams
            />
            <SingleDataList
              componentId='CampusLocationAggregate'
              dataField='repository.keyword'
              title='Campus Location'
              filterLabel='Campus Location'
              showSearch={false}
              URLParams
              data={
                [{
                  label: 'Rare Books and Special Collections',
                  value: 'SPEC RBSC',
                }, {
                  label: 'Snite Museum of Art',
                  value: 'SNITE',
                }, {
                  label: 'University Archives',
                  value: 'ARCHIVES',
                }]
              }
              react={{
                'and': components,
              }}
            />
            <MultiDropdownList
              componentId='LanguageListAggregate'
              dataField='language.keyword'
              title='Language'
              sortBy='count'
              filterLabel='Language'
              showSearch={false}
              react={{
                'and': components,
              }}
              URLParams
            />
          </React.Fragment>
        }
      >
        <ReactiveList
          componentId='SearchResult'
          dataField={'title'}
          react={{
            'and': components,
          }}
          excludeFields={['fulltext']}
          size={48}
          loader={<Loading />}
          scrollOnChange
          infiniteScroll={false}
          pagination
          renderNoResults={<div>No matches could be found</div>}
          render={({ data, error, loading, ...rest }) => (
            <ResponsiveGridList measureBeforeMount>
              {
                data.map(res => (
                  <div key={res['_id']}>
                    <Card
                      label={res.title}
                      image={res.thumbnail}
                      target={res.url}
                      location={location}
                      referal={{ type: 'search', query: location.search }}
                    >
                      <div className='description'>{res.description}</div>
                      <div>{res.creator}</div>
                    </Card>
                  </div>
                )
                )
              }
            </ResponsiveGridList>
          )}
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
