import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import SEO from 'components/Seo'
import Navigation from 'components/Shared/Navigation'

export const MarkdownTemplate = ({ data }) => {
  const post = data.markdownRemark
  const navigation = (post.frontmatter.menu ? <Navigation id={post.frontmatter.menu} /> : null)
  return (
    <Layout
      title={post.frontmatter.title}
      nav={navigation}
      preMain={<SEO title={post.frontmatter.title} />}
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
        menu
      }
    }
  }
`
