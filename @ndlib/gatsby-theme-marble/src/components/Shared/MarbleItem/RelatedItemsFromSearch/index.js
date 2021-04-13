import React from 'react'
import PropTypes from 'prop-types'
import SearchBase from 'components/Shared/SearchBase'
import SearchResults from 'components/Shared/SearchTools/SearchResults'

const RelatedItemsFromSearch = ({ marbleItem }) => {
  if (!process.env.SEARCH_URL || !process.env.SEARCH_INDEX) {
    return null
  }
  const displayContext = 'itemPage'
  return (
    <div id='related-search-section'>
      <h2>Related Items</h2>
      <SearchBase defaultSearch={customQueryBuilder(marbleItem.marbleId)}>
        <SearchResults defaultDisplay='grid' hitsPerPage={8} showPagination={false} scrollTo='#related-search-section' displayContext={displayContext} />
      </SearchBase>
    </div>
  )
}

RelatedItemsFromSearch.propTypes = {
  marbleItem: PropTypes.shape({
    marbleId: PropTypes.string,
  }),
}
export default RelatedItemsFromSearch

const customQueryBuilder = (id) => {
  return {
    more_like_this: {
      fields: ['name', 'creator', 'collection', 'workType', 'allMetadata'],
      like: [
        {
          _index: 'marble',
          _id: id,
        },
      ],
      min_term_freq: 1,
      max_query_terms: 25,
    },
  }
}
