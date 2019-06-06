import React from 'react'
import basicschema from 'components/Schema/basicschema2.json'
import renderer from 'components/Schema/rendering.json'
import TitleMicro from 'components/MicroComp/titlemicro'
import Default from 'components/MicroComp/default'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'

const MetaTest = ({ schema, location }) => {
  const currentSchema = schema != null ? schema : basicschema
  const metaObj = []
  renderer.sections[0].attributes.forEach(function (field) {
    console.log(field)
    if (currentSchema[field.key] != null) {
      switch (field.renderer) {
        case 'title':
          metaObj.push(
            <TitleMicro
              meta={field}
              schema={currentSchema}
              key={field.key}
            />
          )
          break
        case 'basic':
        default:
          metaObj.push(
            <Default
              meta={field}
              schema={currentSchema}
              key={field.key}
            />
          )
      }
    }
  })
  return (
    <Layout location={location}>
      <dl>
        {metaObj}
      </dl>
    </Layout>
  )
}

MetaTest.propTypes = {
  schema: PropTypes.object,
  location: PropTypes.object.isRequired,
}

export default MetaTest
