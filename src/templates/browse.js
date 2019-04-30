import React from 'react'
import PropTypes from 'prop-types'
import Browse from 'components/ManifestViews/Browse'
// Components
import { graphql } from 'gatsby'

const Tags = ({ data, location }) => {
  return (
    <Browse data={data} location={location} />
  )
}

Tags.propTypes = {
  data: PropTypes.shape({
    browseCategory: PropTypes.shape({
      label: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($slug: String) {
    browseCategory( slug: { eq: $slug }) {
      id
      label
      description
      thumbnail
      slug
      manifests {
        slug
        thumbnail {
          _id
        }
        label
      }
      subCategories {
        id
        label
        slug
        thumbnail
      }
      parentCategory {
        id
        label
        slug
      }
      topLevelParentCategory {
        id
        label
        slug
      }
    }
}
`
