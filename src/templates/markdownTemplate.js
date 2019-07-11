import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Markdown from 'components/Markdown'

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
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        menu
        map {
          kmlFile
          defaultZoom
          center {
            lat
            lng
          }
        }
        showBanner
        mainCallOut
        mainCaption
        mainBanner {
          publicURL
        }
        iiifJson {
          id
          label
          description
          attribution
          license
          thumbnail {
            _id
            service {
              _id
            }
          }
          sequences {
            _id
            canvases {
              _id
              _type
              label
              height
              width
              images {
                _id
                _type
                motivation
                on
              }
            }
          }
          metadata {
            label
            value
          }
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
