import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import { ReactiveBase } from '@appbaseio/reactivesearch'

const SearchBase = ({ children, data }) => {
  const searchBase = typy(data, 'site.siteMetadata.searchBase').safeObject
  return (
    <ReactiveBase
      app={searchBase.app}
      url={searchBase.url}>
      {children}
    </ReactiveBase>
  )
}
SearchBase.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
}

export default SearchBase

export const components = ['SearchResult', 'SearchSensor', 'DynamicYearSlider', 'CampusLocationAggregate', 'LanguageListAggregate', 'LocationListAggregate', 'FormatListAggregate']
