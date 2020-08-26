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
        value
        type
      }
      childrenMarbleIiifImage {
        id
        default
        title
        service
        thumbnail
        sequence
        name
        extension
      }
      childrenMarbleItem {
        iiifUri
      }
      copyrightRestricted
      citation
    }
  }
`
