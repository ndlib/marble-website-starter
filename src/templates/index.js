import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Home from 'components/Home'

const IndexPage = ({ data, location }) => {
  return (
    <Home
      location={location}
      data={data}
    />
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        mainCallOut
        mainCaption
        mainBanner {
          publicURL
        }
        cards {
          groups {
            label
            items {
              image {
                publicURL
              }
              label
              target
            }
          }
        }
      }
    }
  }
`
