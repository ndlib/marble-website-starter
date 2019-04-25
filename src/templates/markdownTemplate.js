import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const MarkdownTemplate = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout
      title={post.frontmatter.title}
    >
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

MarkdownTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}
export default MarkdownTemplate

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
      }
    }
  }
`
