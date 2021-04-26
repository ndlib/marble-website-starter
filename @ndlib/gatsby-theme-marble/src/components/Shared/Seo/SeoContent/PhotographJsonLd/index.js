import React from 'react'
import PropTypes from 'prop-types'
import { JsonLd } from '../JsonLd'

export default function PhotographJsonLd ({ title, description, date, image, author, creditText, dimensions, thumbnail, keywords }) {
  return (
    <JsonLd>
      {{
        '@context': 'https://schema.org',
        '@type': 'VisualArtwork',
        'name': title,
        'dateCreated': date,
        'description': description,
        'image': image,
        'thumbnailUrl': thumbnail,
        'keywords': keywords,
        'size': dimensions,
        'artform': 'photograph',
        'creator': [
          {
            '@type': 'Person',
            'name': author,
          },
        ],
        'artMedium': 'photography',
        'creditText': creditText,
      }}
    </JsonLd>
  )
}

PhotographJsonLd.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  creditText: PropTypes.string.isRequired,
  dimensions: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
}
