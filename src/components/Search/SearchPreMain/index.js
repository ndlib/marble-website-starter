import React from 'react'
import PropTypes from 'prop-types'
import {
  DataSearch,
  SelectedFilters,
} from '@appbaseio/reactivesearch'
import Seo from 'components/Shared/Seo/'
import style from './style.module.css'

const SearchPreMain = ({ components }) => {
  return (
    <div className={style.searchHead}>
      <Seo title='Search' />
      <DataSearch
        componentId='SearchSensor'
        dataField={['title', 'creator', 'fulltext', 'type', 'systemId']}
        filterLabel='Search'
        highlight
        highlightField={['title', 'creator', 'systemId']}
        react={{ 'and': components }}
        URLParams
      />
      <SelectedFilters />
    </div>
  )
}

SearchPreMain.propTypes = {
  components: PropTypes.array.isRequired,
}

export default SearchPreMain
