import React from 'react'
import schema1 from '../../content/schema/basicschema1.json'
import schema2 from '../../content/schema/basicschema2.json'
import schema3 from '../../content/schema/basicschema3.json'
import renderer from '../../content/schema/rendering.json'
import SchemaRenderer from 'components/Experimental/SchemaRenderer'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'

const MetaTest = ({ location }) => {
  const schemas = [schema1, schema2, schema3]
  return (
    <Layout location={location}>
      {
        schemas.map((schema, index) => {
          return (
            <SchemaRenderer
              schema={schema}
              renderer={renderer}
              key={index}
            />
          )
        })
      }

    </Layout>
  )
}

MetaTest.propTypes = {
  location: PropTypes.object.isRequired,
}

export default MetaTest
