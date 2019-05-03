import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import CollectionAside from './CollectionAside'
import CollectionPreMain from './CollectionPreMain'
import Card from 'components/Shared/Card'

export const Collection = ({ iiifManifest, location }) => {
  return (
    <Layout
      aside={<CollectionAside iiifManifest={iiifManifest} />}
      preMain={<CollectionPreMain iiifManifest={iiifManifest} location={location} />}
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
                iiifManifest={manifest}
                location={location}
                referal={{
                  type:'collection',
                  label: iiifManifest.label,
                  target: location.pathname,
                }}
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
  location: PropTypes.object.isRequired,
}
export default Collection
