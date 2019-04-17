import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import CollectionAside from './CollectionAside'
import CollectionPreMain from './CollectionPreMain'
import Card from 'components/Shared/Card'

export const Collection = ({ iiifManifest }) => {
  return (
    <Layout
      aside={<CollectionAside iiifManifest={iiifManifest} />}
      preMain={<CollectionPreMain iiifManifest={iiifManifest} />}
      title={iiifManifest.label}
    >
      <DisplayViewToggle>
        {
          iiifManifest.childrenIiifManifest.map(manifest => {
            return (
              <Card
                key={JSON.stringify(manifest)}
                target={`/${manifest.slug}`}
                label={manifest.label}
                image={manifest.thumbnail['_id']}
              />
            )
          })
        }
      </DisplayViewToggle>
    </Layout>
  )
}

Collection.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}
export default Collection
