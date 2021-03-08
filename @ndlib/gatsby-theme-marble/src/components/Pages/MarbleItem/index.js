/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Shared/Seo'
import CollectionLayout from './CollectionLayout'
import ItemLayout from './ItemLayout'
import RelatedItemsFromSearch from './RelatedItemsFromSearch'

const MarbleItem = ({ data, location }) => {
  const { marbleItem, allMarbleFile } = data
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
            allMarbleFile={allMarbleFile}
          />
        )
      }
      <RelatedItemsFromSearch marbleItem={marbleItem} />
    </Layout>
  )
}

MarbleItem.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default MarbleItem
