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
      }
    }
  }
`
/*

annotation
copyrightRestricted
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
ndJson {
  id
  iiifFilePath
  iiifImageFilePath
  iiifImageUri
  iiifUri
  workType
  uniqueIdentifier
  title
  subjects {
    uri
    term
    authority
  }
  sourceSystem
  schemaUri
  schemaPath
  repository
  publisher {
    publisherName
    publisherLocation
  }
  parentId
  md5Checksum
  mimeType
  metsUri
  metsFilePath
  medium
  linkToSource
  level
  items {
    access
    apiVersion
    collectionId
    collectionInformation
    copyrightStatement
    copyrightStatus
    dedication
    description
    dimensions
    fileId
    filePath
    format
    height
    id
    iiifFilePath
    iiifImageFilePath
    iiifImageUri
    iiifUri
    languages
    level
    linkToSource
    md5Checksum
    medium
    metsFilePath
    metsUri
    mimeType
    parentId
    repository
    schemaPath
    schemaUri
    sourceSystem
    title
    uniqueIdentifier
    width
    workType
  }
}
*/
