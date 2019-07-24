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
  fragment ComponentFragment on component {
    component
    props {
      label
      value
      fileValue {
        publicURL
      }
    }
  }
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      fields {
        components {
          ...ComponentFragment
          components {
            ...ComponentFragment
            components {
              ...ComponentFragment
              components {
                ...ComponentFragment
                components {
                  ...ComponentFragment
                  components {
                    ...ComponentFragment
                  }
                }
              }
            }
          }
        }
      }
      html
      frontmatter {
        title
        slug
        menu
        layout
        map {
          kmlFile
          defaultZoom
          center {
            lat
            lng
          }
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
          manifests {
          _id
          _type
          label
          thumbnail {
            service {
              _id
              _context
              profile
            }
            _id
          }
          description
            metadata {
              label
              value
            }
            license
          }
        }
      }
    }
  }
`
