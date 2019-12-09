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

  fragment iiifProviderJsonFragment on iiifProviderJson {
    id
    type
    label {
      ...iiifTranslatedStringFragment
    }
    homepage {
      ...iiifHomepageFragment
    }
    logo {
      ...iiifLogoJsonFragment
    }
    seeAlso {
      ...iiifSeeAlsoFragment
    }
  }

  fragment iiifLogoJsonFragment on iiifLogoJson {
    id
    type
    height
    weight
    format
  }

  fragment iiifHomepageFragment on iiifHomepage {
    id
    type
    label {
      ...iiifTranslatedStringFragment
    }
    format
  }

  fragment iiifSeeAlsoFragment on iiifSeeAlso {
    id
    type
    format
    profile
  }


  fragment iiifJsonItemFragment on iiifItem {
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
    width
    height
    service {
      ...iiifServiceFragment
    }
    provider {
      ...iiifProviderJsonFragment
    }    
    motivation
    target
    body {
      ...iiifItemAnnotationPageBodyFragment
    }
  }

  fragment iiifJsonFragment on IiifJson {
    id
    type
    slug
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
    provider {
      ...iiifProviderJsonFragment
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
    }
    remarkMarblePage(frontmatter: {slug: { eq: $slug }}) {
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
      frontmatter {
        title
        slug
        menu
        defaultSearch {
          tag
        }
        layout
        description
        author
        iiifJson {
          ...iiifJsonFragment
          items {
            ...iiifJsonItemFragment
            items {
              ...iiifJsonItemFragment
              items {
                ...iiifJsonItemFragment
              }
            }
          }
        }
      }
    }
  }
`
