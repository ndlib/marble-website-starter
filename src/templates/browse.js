import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Thumbnail from 'components/Shared/Thumbnail'

// Components
import { Link, graphql } from 'gatsby'

const Tags = ({ data }) => {
  const category = data.browseCategory
  return (
    <Layout>
      <h1>{category.label}</h1>
      <p>{category.id}</p>
      <p>{category.description}</p>
      <p><Thumbnail src={category.thumbnail} /></p>
      <ul>
        {category.subCategories && category.subCategories.map((node) => {
          const { id, label, slug } = node
          return (
            <li key={id}>
              <Link to={slug}>{label}</Link>
            </li>
          )
        })}
      </ul>
      <ul>
        {category.manifests && category.manifests.map((node) => {
          const { slug, label } = node
          return (
            <li key={slug}>
              <Link to={slug}>{label}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
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
      }
      parentCategory {
        id
        label
      }
      topLevelParent {
        id
        label
      }
    }
}
`
