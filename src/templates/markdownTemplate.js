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
  fragment iiifTranslatedStringFragment on iiifTranslatedString {
    en
    en_GB
    en_US
    fr
    none
  }

  fragment iiifLabeledStringFragment on iiifLabeledString {
    label {
      ...iiifTranslatedStringFragment
    }
    value {
      ...iiifTranslatedStringFragment
    }
  }

  fragment iiifThumbnailJsonFragment on iiifThumbnailJson {
    id
    type
    format
    service {
      ...iiifServiceFragment
    }
  }

  fragment iiifServiceFragment on iiifServiceJson {
    id
    _context
    profile
  }

  fragment iiifItemCanvasFragment on iiifItemCanvas {
    id
    height
    type
    width
    label {
      ...iiifTranslatedStringFragment
    }
    thumbnail {
      ...iiifThumbnailJsonFragment
    }
    items {
      ...iiifItemsListFragment
    }
  }

  fragment iiifItemAnnotationPageFragment on iiifItemAnnotationPage {
    id
    type
    label {
      ...iiifTranslatedStringFragment
    }
    motivation
    target
    body {
      ...iiifItemAnnotationPageBodyFragment
    }
  }

  fragment iiifItemAnnotationPageBodyFragment on iiifItemAnnotationPageBody {
    id
    type
    format
    width
    height
    service {
      ...iiifServiceFragment
    }
  }

  fragment iiifItemsListFragment on iiifItemsList {
    id
    type
    items {
      ...iiifItemAnnotationPageFragment
    }
  }

  fragment iiifJsonFragment on IiifJson {
    id
    type
    label {
      ...iiifTranslatedStringFragment
    }
    summary {
      ...iiifTranslatedStringFragment
    }
    rights
    requiredStatement {
      ...iiifLabeledStringFragment
    }
    metadata {
      ...iiifLabeledStringFragment
    }
    viewingDirection
    thumbnail {
      ...iiifThumbnailJsonFragment
    }
    items {
      ...iiifItemCanvasFragment
    }
  }

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
          ...iiifJsonFragment
        }
      }
    }
  }
`
