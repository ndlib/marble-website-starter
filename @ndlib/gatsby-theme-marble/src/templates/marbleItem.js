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
      childrenMarbleItem {
        title
        slug
        childrenMarbleIiifImage {
          thumbnail
        }
        description
        iiifUri
        marbleId
      }
      childrenMarbleIiifImage {
        id
      }
      copyrightRestricted
      citation
    }
    allMarbleIiifImage(
      filter: {marbleParent: {slug: {eq: $slug}}},
      sort: {fields: sequence, order: ASC},
      limit: 6
    ) {
      nodes {
        sequence
        service
        default
        thumbnail
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
