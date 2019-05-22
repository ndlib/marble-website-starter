import React from 'react'
import basicschema from 'components/Schema/basicschema2.json'
import renderer from 'components/Schema/rendering.json'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'

const MetaTest = ({ schema, location }) => {
  const currentSchema = schema != null ? schema : basicschema
  const metaObj = []
  renderer.sections[0].attributes.forEach(function (field) {
    if (currentSchema[field.key] != null) {
      switch (field.renderer) {
        case 'title':
          metaObj.push(<h1 className={field.key}> {currentSchema[field.key]} </h1>)
          break
        case 'basic':
        default:
          metaObj.push(<React.Fragment><dt key={field.label}>{field.label}:</dt><dd className={field.key} key={field.key}> {currentSchema[field.key]} </dd></React.Fragment>)
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
