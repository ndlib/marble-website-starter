import React from 'react'
import PropTypes from 'prop-types'
import Browse from 'components/ManifestViews/Browse'
import { graphql } from 'gatsby'
import PrivateRoute from 'components/Shared/PrivateRoute'

export const BrowseTemplate = ({ data, location }) => {
  return (
    <PrivateRoute location={location} testLogin={false}>
      <Browse data={data} />
    </PrivateRoute>
  )
}

BrowseTemplate.propTypes = {
  data: PropTypes.shape({
    browseCategory: PropTypes.shape({
      label: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  }),
  location: PropTypes.object.isRequired,
}

export default BrowseTemplate

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
