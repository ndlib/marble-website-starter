import React from 'react'
import Collection from 'components/ManifestViews/Collection'
import { graphql } from 'gatsby'

export default ({ data }) => (
  <Collection iiifManifest={data.iiifManifest} />
)

export const query = graphql`
  query($slug: String!) {
    iiifManifest( slug: { eq: $slug }) {
      id
      label
      description
      thumbnail {
        _id
      }
      slug
      metadata {
        label
        value
      }
      childrenIiifManifest {
        id
        label
        slug
        thumbnail {
          _id
        }
        slug
      }
    }
  }
`
