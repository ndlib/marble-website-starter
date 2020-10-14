/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import CollectionLayout from './CollectionLayout'
import ItemLayout from './ItemLayout'
import SearchBase from 'components/Shared/SearchBase'
import SearchResults from 'components/Shared/SearchTools/SearchResults'

const MarbleItem = ({ data, location }) => {
  const { marbleItem, allMarbleIiifImage } = data
  return (
    <Layout
      title={marbleItem.title}
      location={location}
    >
      <Seo
        data={data}
        location={location}
      />

      {
        marbleItem.display === 'collection' ? (
          <CollectionLayout
            location={location}
            marbleItem={marbleItem}
          />
        ) : (
          <ItemLayout
            location={location}
            marbleItem={marbleItem}
            allMarbleIiifImage={allMarbleIiifImage}
          />
        )
      }

      <div id='related-search-section'>
        <h2>Experimental Related Items</h2>
        <SearchBase defaultSearch={customQueryBuilder(marbleItem.marbleId)}>
          <SearchResults defaultDisplay='grid' hitsPerPage={8} showPagination={false} scrollTo='#related-search-section' />
        </SearchBase>
      </div>
    </Layout>
  )
}

const customQueryBuilder = (id) => {
  return {
    more_like_this: {
      fields: ['name', 'creator^2', 'themeTag^3'],
      like: [
        {
          '_index': 'marble',
          '_id': `${id}`,
        }
       ],
      min_term_freq: 1,
      max_query_terms: 12,
    }
  }
}

MarbleItem.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default MarbleItem
