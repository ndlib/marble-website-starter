import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import NDJson from 'components/Pages/NDJson'

export const NDJsonPage = ({ data, location }) => {
  return (<div>HI</div>)
  return (
    <NDJson
      data={data}
      location={location}
    />
  )
}
NDJsonPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default NDJsonPage
/*
export const query = graphql`
  query($id: String!) {
    ndJson( id: { eq: $id } ) {
      access
      apiVersion
      collectionId
      collectionInformation
      contributors {
        attribution
        display
        fullName
        lifeDates
      }
      copyrightStatement
      copyrightStatus
      creators {
        alive
        attribution
        display
        endDate
        fullName
        human
        lifeDates
        lifeFlag
        livingFlag
        nationality
        role
        startDate
      }
      dedication
      description
      dimensions
      fileId
      filePath
      format
      id
      iiifFilePath
      iiifImageFilePath
      iiifImageUri
      iiifUri
      workType
      uniqueIdentifier
      title
      thumbnail
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
        items {
          id
          iiifUri
          iiifImageUri
        }
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
  }
`
*/
