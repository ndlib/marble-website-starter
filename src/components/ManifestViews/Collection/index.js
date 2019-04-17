import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import Sidebar from './Sidebar'
import Card from 'components/Shared/Card'
import style from './style.module.css'

// TODO: DON'T USE THUMBNAIL
import Thumbnail from 'components/Shared/Thumbnail'

export const Collection = ({ iiifManifest }) => {
  return (
    <Layout
      aside={<Sidebar iiifManifest={iiifManifest} />}
    >
      <SEO title={iiifManifest.label} description={iiifManifest.description} />
      <div><Thumbnail src={iiifManifest.thumbnail} /></div>
      <div>Breadcrumb</div>
      <article>
        <h1>{iiifManifest.label}</h1>
        <div classame='placeholder-for-toggle-class'>
          <div>DisplayViewToggle</div>
          <ul>
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
          </ul>
        </div>
      </article>
    </Layout>
  )
}

Collection.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}
export default Collection
