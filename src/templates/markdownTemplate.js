import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
import Navigation from 'components/Shared/Navigation'
import PrivateRoute from 'components/Shared/PrivateRoute'

export const MarkdownTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const navigation = (post.frontmatter.menu ? <Navigation id={post.frontmatter.menu} /> : null)
  return (
    <PrivateRoute location={location} testLogin={false}>
      <Layout
        title={post.frontmatter.title}
        nav={navigation}
        preMain={<SEO title={post.frontmatter.title} />}
      >
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Layout>
    </PrivateRoute>
  )
}

MarkdownTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
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
