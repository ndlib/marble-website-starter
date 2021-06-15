import React from 'react'
import PropTypes from 'prop-types'
import { JsonLd } from '../JsonLd'

export const SchemaJsonLd = (props) => {
  const {
    thumbnail,
    title,
    author,
    description,
    date,
    url,
    keywords,
    image,
    classification,
    creditText,
    dimensions,
    relatedLocation,
    copyrightStatus,
    publisher,
    materialType,
    physicalCharacteristic,
    language,
    acquisition,
    accessionNumber,
    campusLocation,
    identifier,
  } = props
  return (
    <JsonLd>
      {{
        '@context': 'https://schema.org',
        '@type': 'VisualArtwork',
        name: title,
        creator: [
          {
            '@type': 'Person',
            name: author,
          },
        ],
        url: url,
        locationCreated: relatedLocation,
        dateCreated: date,
        description: description,
        inLanguage: language,
        image: image,
        thumbnailUrl: thumbnail,
        keywords: keywords,
        size: dimensions || physicalCharacteristic,
        artMedium: classification,
        artform: materialType,
        creditText: creditText,
        copyrightNotice: copyrightStatus,
        publisher: publisher,
        identifier: identifier || accessionNumber,
        sponsor: acquisition,
        maintainer: campusLocation,
        provider: creditText,
      }}
    </JsonLd>
  )
}

SchemaJsonLd.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  creditText: PropTypes.string,
  classification: PropTypes.string,
  copyrightStatus: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  dimensions: PropTypes.string,
  relatedLocation: PropTypes.string,
  publisher: PropTypes.string,
  materialType: PropTypes.string,
  physicalCharacteristic: PropTypes.string,
  acquisition: PropTypes.string,
  accessionNumber: PropTypes.string,
  identifier: PropTypes.string,
  language: PropTypes.string,
  campusLocation: PropTypes.string,
}

export default SchemaJsonLd
