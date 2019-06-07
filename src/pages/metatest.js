import React from 'react'
import basicschema from 'components/Schema/basicschema2.json'
import renderer from 'components/Schema/rendering.json'
import TitleMicro from 'components/MicroComp/titlemicro'
import DateMicro from 'components/MicroComp/datemicro'
import Default from 'components/MicroComp/default'
import LinkMicro from 'components/MicroComp/linkmicro'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'

const MetaTest = ({ schema, location }) => {
  const currentSchema = schema != null ? schema : basicschema
  const metaObj = []
  renderer.sections[0].attributes.forEach(function (field) {
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
        case 'date':
          metaObj.push(
            <DateMicro
              meta={field}
              schema={currentSchema}
              key={field.key}
            />
          )
          break
        case 'link':
          metaObj.push(
            <LinkMicro
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
