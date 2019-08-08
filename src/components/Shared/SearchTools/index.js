import React from 'react'
import {
  MultiList,
  SingleDataList,
  RangeSlider,
  MultiDropdownList,
} from '@appbaseio/reactivesearch'
import { components } from 'components/Internal/SearchBase'

const SearchTools = () => {
  return (
    <React.Fragment>
      <MultiList
        componentId='FormatListAggregate'
        dataField='type.keyword'
        title='Format'
        size={7}
        filterLabel='Format'
        showSearch={false}
        react={{ and: components }}
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
        react={{ and: components }}
        URLParams
      />
      <RangeSlider
        componentId='DynamicYearSlider'
        dataField='year'
        title='Date'
        filterLabel='Date'
        stepValue={5}
        interval={5}
        react={{ and: components }}
        rangeLabels={{
          start: '1880',
          end: '2010',
        }}
        range={{
          start: 1880,
          end: 2010,
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
        react={{ and: components }}
      />
      <MultiDropdownList
        componentId='LanguageListAggregate'
        dataField='language.keyword'
        title='Language'
        sortBy='count'
        filterLabel='Language'
        showSearch={false}
        react={{ and: components }}
        URLParams
      />
    </React.Fragment>
  )
}

export default SearchTools
