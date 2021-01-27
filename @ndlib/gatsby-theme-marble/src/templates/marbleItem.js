import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MarbleItem from 'components/Pages/MarbleItem'
import queryString from 'query-string'

export const MarbleItemPage = ({ data, location }) => {
  // use ?debug=true to render graphQL data at end of page
  const { debug } = queryString.parse(location.search)
  return (
    <>
      <MarbleItem
        data={data}
        location={location}
      />
      {
        debug ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : null
      }
    </>
  )
}
MarbleItemPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default MarbleItemPage

export const query = graphql`
  query($slug: String!) {
    marbleItem( slug: { eq: $slug } ) {
      id
      slug
      marbleId
      display
      title
      description
      iiifUri
      partiallyDigitized
      metadata {
        label
        urlField
        value
        type
      }
      marbleParent {
        title
        slug
        childrenMarbleItem {
          title
          slug
          childrenMarbleFile {
            fileType
            iiif {
              thumbnail
            }
          }
        }
      }
      childrenMarbleItem {
        title
        slug
        childrenMarbleFile {
          file
          fileType
          iiif {
            thumbnail
            service
            default
          }
        }
        description
        iiifUri
        marbleId
      }
      childrenMarbleFile {
        id
        name
        title
        file
        fileType
        iiif {
          thumbnail
          service
          default
        }
      }
      copyrightRestricted
      citation
    }
    allMarbleFile(
      filter: {marbleParent: {slug: {eq: $slug}}, fileType: {eq: "image"}},
      sort: {fields: sequence, order: ASC},
      limit: 6
    ) {
      nodes {
        sequence
        iiif {
          service
          default
          thumbnail
        }
        local {
          publicURL
          childImageSharp {
            fixed(width: 125, height: 125) {
              src
            }
          }
        }
      }
    }
  }
`
