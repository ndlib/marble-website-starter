import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MarbleItem from 'components/Pages/MarbleItem'

export const MarbleItemPage = ({ data, location }) => {
  return (
    <MarbleItem
      data={data}
      location={location}
    />
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
      sequence
      childrenMarbleIiifImage {
        id
        default
        title
        service
        thumbnail
        sequence
      }
      childrenMarbleItem {
        iiifUri
      }
      copyrightRestricted
    }
  }
`
