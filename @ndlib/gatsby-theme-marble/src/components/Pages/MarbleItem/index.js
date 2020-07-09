/** @jsx jsx */
import { BaseStyles, jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import CollectionLayout from './CollectionLayout'
import ItemLayout from './ItemLayout'

const MarbleItem = ({ data, location }) => {
  const { marbleItem } = data
  return (
    <Layout
      title={marbleItem.title}
      location={location}
    >
      <Seo
        data={data}
        location={location}
      />
      <BaseStyles>
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
            />
          )
        }
        <code><pre>{JSON.stringify(data, null, 2)}</pre></code>
        <div />
        <code><pre>{JSON.stringify(location, null, 2)}</pre></code>
      </BaseStyles>
    </Layout>
  )
}

MarbleItem.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default MarbleItem
