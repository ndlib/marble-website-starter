import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import CollectionAside from './CollectionAside'
import CollectionPreMain from './CollectionPreMain'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import Card from 'components/Shared/Card'

export const Collection = ({ iiifManifest, location }) => {
  return (
    <Layout
      aside={<CollectionAside iiifManifest={iiifManifest} />}
      preMain={<CollectionPreMain iiifManifest={iiifManifest} location={location} />}
      title={iiifManifest.label}
    >
      <DisplayViewToggle>
        <ResponsiveGridList
          breakpoints={{ lg: 600, md: 480, sm: 240 }}
          cols={{ lg: 6, md: 4, sm: 2 }}
          rowHeight={200}
          cardWidth={2}
        >
          {
            iiifManifest.childrenIiifManifest.map(manifest => {
              return (
                <div key={manifest.id}>
                  <Card
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
                </div>
              )
            })
          }
        </ResponsiveGridList>
      </DisplayViewToggle>
    </Layout>
  )
}

Collection.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default Collection
