import React from 'react'
import PropTypes from 'prop-types'
import { JsonLd } from '../JsonLd'

export default function WebsiteJsonLd({ pathname, siteUrl }) {
  if (pathname === '/') {
    return (
      <JsonLd>
        {{
          "@context": "https://schema.org",
          "@type": "Website",
          url: {siteUrl},
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      </JsonLd>
    )
  }
  return null
}

WebsiteJsonLd.propTypes = {
  pathname: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
}
