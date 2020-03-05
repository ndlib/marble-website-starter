import React from 'react'
import { graphql } from 'gatsby'
import Link from 'components/Internal/Link'

export const AllPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.slug.match(/item/)) // You can filter your posts based on some criteria
    .map(edge => <li key={edge.node.id}><Link to={edge.node.frontmatter.slug} >{edge.node.frontmatter.title}</Link></li>)

  return (
    <div>
      <h1>All Current items</h1>
      <ul>{Posts}</ul>
    </div>
  )
}

export default AllPage
export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`
