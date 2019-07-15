import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Markdown from 'components/Markdown'
import MarkdownNew from 'components/MarkdownNew'
import typy from 'typy'

export const MarkdownTemplate = ({ data, location }) => {
  if (typy(data, 'markdownRemark.frontmatter.components').safeObject) {
    return (
      <MarkdownNew
        data={data}
        location={location}
      />
    )
  }
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
        components {
          component
          props {
            label
            value
            fileValue {
              publicURL
            }
          }
          components {
            component
            props {
              label
              value
              fileValue {
                publicURL
              }
            }
            components {
              component
              props {
                label
                value
                fileValue {
                  publicURL
                }
              }
              components {
                component
                props {
                  label
                  value
                  fileValue {
                    publicURL
                  }
                }
              }
            }
          }
        }
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
