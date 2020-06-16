import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Markdown from 'components/Pages/Markdown'

export const MarkdownTemplate = ({ data, location }) => {
  return (
    <Markdown
      data={data}
      location={location}
    />
  )
}

MarkdownTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default MarkdownTemplate

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author
        searchBase {
          app
          url
        }
      }
    }
    markdownRemark(frontmatter: {slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        slug
      }
    }
  }
`
