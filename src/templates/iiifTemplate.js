import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Collection from 'components/ManifestViews/Collection'
import Item from 'components/ManifestViews/Item'
export const IIIFTemplate = ({ data, pageContext, location }) => {
  let component = Item
  if (pageContext.layout === 'sc:collection') {
    component = Collection
  }
  const props = { iiifManifest: data.iiifManifest, location: location }
  return React.createElement(component, props, null)
}

IIIFTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object,
  location: PropTypes.object.isRequired,
}

export default IIIFTemplate
/*
export const query = graphql`
  query($slug: String!) {
    iiifManifest( slug: { eq: $slug }) {
      id
      label
      description
      attribution
      license
      slug
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
      metadata {
        label
        value
      }
      childrenIiifManifest {
        id
        label
        description
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
*/
