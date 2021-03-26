import React from 'react'
import PropTypes from 'prop-types'
import { JsonLd } from 'gatsby-plugin-next-seo'
import { Website } from 'schema-dts'

export const WebsiteJsonLd = ({ pathname, siteUrl }) => {
  if (pathname === '/') {
    return (
      <>
        <JsonLd
          item={{
            '@context': 'https://schema.org',
            '@type': 'Website',
            url: {siteUrl},
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }}
        />
      </>
    )
  }
  return null
}

WebsiteJsonLd.propTypes = {
  pathname: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
}

export default WebsiteJsonLd
