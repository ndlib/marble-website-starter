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
        service {
          _id
        }
      }
      sequences {
        _id
        canvases {
          _id
          _type
          label
          height
          width
          images {
            _id
            _type
            motivation
            on
          }
        }
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
        sequences {
          _id
          canvases {
            _id
            _type
            label
            height
            width
            images {
              _id
              _type
              motivation
              on
            }
          }
        }
        slug
      }
    }
  }
`
