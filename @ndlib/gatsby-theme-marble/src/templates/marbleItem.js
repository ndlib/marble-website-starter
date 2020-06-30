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
      annotation
      iiifUri
      copyrightRestricted
      partiallyDigitized
      image {
        default
        service
        thumbnail
      }
      allImages {
        default
        service
        thumbnail
      }
      metadata {
        label
        value
      }
      seeAlso
    }
  }
`
