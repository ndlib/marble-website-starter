import React from 'react'
import PropTypes from 'prop-types'
import { JsonLd } from '../JsonLd'

export default function PaintingsJsonLd ({ title, description, date, image, author, creditText, dimensions, thumbnail, keywords }) {
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
        'artform': 'painting',
        'creator': [
          {
            '@type': 'Person',
            'name': author,
          },
        ],
        'artMedium': 'canvas',
        'creditText': creditText,
      }}
    </JsonLd>
  )
}

PaintingsJsonLd.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  creditText: PropTypes.string,
  dimensions: PropTypes.string,
  thumbnail: PropTypes.string.isRequired,
  keywords: PropTypes.string,
}
