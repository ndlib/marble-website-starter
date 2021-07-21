import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import SearchBase from 'components/Shared/SearchBase'
import SearchResults from 'components/Shared/SearchTools/SearchResults'

const RelatedItemsFromSearch = ({ marbleItem }) => {
  const { marbleConfiguration } = useStaticQuery(query)
  if (!marbleConfiguration.search || !marbleConfiguration.search.index || !marbleConfiguration.search.url) {
    return null
  }
  const displayContext = 'itemPage'
  return (
    <div id='related-search-section'>
      <h2>Related Items</h2>
      <SearchBase defaultSearch={customQueryBuilder(marbleItem.marbleId, marbleConfiguration.search.index)}>
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

const customQueryBuilder = (id, index) => {
  return {
    more_like_this: {
      fields: ['name', 'creator', 'collection', 'allMetadata'],
      like: [
        {
          _index: index,
          _id: id,
        },
      ],
      min_term_freq: 1,
      max_query_terms: 25,
    },
  }
}

export const query = graphql`
query {
  marbleConfiguration {
    search {
      url
      index
    }
  }
}
`
