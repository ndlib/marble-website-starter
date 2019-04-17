import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Item from 'components/ManifestViews/Item'

export const ItemTemplate = ({ data }) => (
  <Item iiifManifest={data.iiifManifest} />
)

ItemTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ItemTemplate
export const query = graphql`
  query($slug: String!) {
    iiifManifest( slug: { eq: $slug }) {
      id
      label
      description
      slug
      metadata {
        label
        value
      }
      thumbnail {
        _id
      }
    }
  }
`
