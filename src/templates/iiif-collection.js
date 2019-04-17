import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Collection from 'components/ManifestViews/Collection'

export const CollectionTemplate = ({ data }) => (
  <Collection iiifManifest={data.iiifManifest} />
)

CollectionTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CollectionTemplate
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
