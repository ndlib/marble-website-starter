import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Item from 'components/ManifestViews/Item'

export const ItemTemplate = ({ data, location }) => (
  <Item
    iiifManifest={data.iiifManifest}
    location={location}
  />
)

ItemTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default ItemTemplate
export const query = graphql`
  query($slug: String!) {
    iiifManifest( slug: { eq: $slug }) {
      id
      label
      description
      attribution
      license
      slug
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
      metadata {
        label
        value
      }
      thumbnail {
        _id
        service {
          _id
        }
      }
    }
  }
`
