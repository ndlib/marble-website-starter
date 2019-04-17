import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import Thumbnail from "../components/thumbnail"

// Components
import { Link, graphql } from "gatsby"

const Tags = ({ data }) => {
  const nodes = data.allIiifManifest.nodes
  const categories = data.allBrowseCategory.nodes
  const category = data.browseCategory
  return (
    <Layout>
      <h1>{category.label}</h1>
      <p>{category.description}</p>
      <p><Thumbnail src={category.thumbnail} /></p>
      <ul>
        {categories.map((node) => {
          const { id, label } = node
          return (
            <li key={id}>
              <Link to={'/browse/' + id}>{label}</Link>
            </li>
          )
        })}
      </ul>
      <ul>
        {nodes.map((node) => {
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
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    browseCategory( id: { eq: $tag }) {
      id
      label
      description
      thumbnail
    },
    allIiifManifest(
      limit: 2000
      filter: { tags: { in: [$tag] } }
    ) {
        nodes {
          slug
          thumbnail {
            _id
          }
          label
        }
      },
      allBrowseCategory(
        limit: 2000
        filter: { parent_id: { eq: $tag } }
      ) {
          nodes {
            id
            thumbnail
            label
          }
        },
    }
`
