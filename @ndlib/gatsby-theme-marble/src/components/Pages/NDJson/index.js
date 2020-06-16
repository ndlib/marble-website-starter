/** @jsx jsx */
import { BaseStyles, jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import CollectionLayout from './CollectionLayout'
import ItemLayout from './ItemLayout'

const NDJson = ({ data, location }) => {
  const { ndJson } = data.marbleItem
  console.log('n', ndJson)
  return (
    <Layout
      title={ndJson.title}
      location={location}
    >
      <Seo
        data={data}
        location={location}
      />
      <BaseStyles>
        <ItemLayout
          location={location}
          ndJson={ndJson}
        />
        <code><pre>{JSON.stringify(data, null, 2)}</pre></code>
        <div />
        <code><pre>{JSON.stringify(location, null, 2)}</pre></code>
      </BaseStyles>
    </Layout>
  )
}

NDJson.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default NDJson
