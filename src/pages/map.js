import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
import { ReactiveBase, DataSearch, SingleDataList,  MultiList, ReactiveList, DynamicRangeSlider, MultiDropdownList, MultiDataList, SelectedFilters } from '@appbaseio/reactivesearch'
import { ReactiveGoogleMap } from '@appbaseio/reactivemaps'
const MapPage = ({ location }) => (
  <Layout location={location}>
    <ReactiveBase
      app="website"
      url="https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com"
      mapKey="AIzaSyAKDHMmDseH35VfYP0ZykHC_6QDCHYoXS0">

      <ReactiveGoogleMap
        componentId="MapUI"
        dataField="location"
        title="Venue Location Map"
        size={100}
        defaultZoom={3}
        renderError={(error) => (
                <div>
                    Something went wrong!<br/>Error details<br/>{error}
                </div>
            )
        }
        renderData={result => ({
          label: result.title
        })}
      />
      <SingleDataList
        componentId="CampusLocationAggregate"
        dataField="repository.keyword"
        title="Campus Location"
        sortBy="count"
        filterLabel="Campus Location"
        showSearch={false}
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
    </ReactiveBase>
  </Layout>
)

MapPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default MapPage
