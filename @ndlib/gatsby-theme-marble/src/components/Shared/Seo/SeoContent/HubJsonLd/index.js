import React from 'react'
import PropTypes from 'prop-types'
import { JsonLd } from '../JsonLd'

export const HubJsonLd = (props) => {
  const {
    thumbnail,
    pathname,
    title,
    description,
    date,
    url,
    image,
    language,
  } = props
  if (pathname.includes('/featured/')) {
    return (
      <JsonLd>
        {{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          mentions: {
            '@type': 'SoftwareApplication',
            operatingSystem: 'All',
            applicationCategory: 'BusinessApplication',
          },
          about: description,
          name: title,
          url: url,
          dateCreated: date,
          inLanguage: language,
          image: image,
          thumbnailUrl: thumbnail,
        }}
      </JsonLd>
    )
  }
  return null
}

HubJsonLd.propTypes = {
  pathname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string,
  image: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  language: PropTypes.string,
}

export default HubJsonLd
