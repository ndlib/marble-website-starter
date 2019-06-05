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
    if (currentSchema[field.key] != null) {
      switch (field.renderer) {
        case 'title':
          metaObj.push(<div className={field.key} key={field}> <TitleMicro meta={field} schema={currentSchema} /> </div>)
          break
        case 'basic':
        default:
          metaObj.push(<div key={field}> <Default meta={field} schema={currentSchema} /></div>)
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
