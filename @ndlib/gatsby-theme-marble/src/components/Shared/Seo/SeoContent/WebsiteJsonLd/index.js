import React from 'react'
import PropTypes from 'prop-types'
import { JsonLd } from 'gatsby-plugin-next-seo'

export const WebsiteJsonLd = ({ pathname, siteUrl }) => {
  if (pathname === '/') {
  return (
    <>
      <JsonLd
        context='https://schema.org'
        type='Website'
        url={siteUrl}
        potentialAction={{
          type: 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          queryInput: 'required name=search_term_string',
        }}
      />
    </>
  )}
}

WebsiteJsonLd.propTypes = {
  pathname: PropTypes.string,
  siteUrl: PropTypes.string.isRequired,
}

export default WebsiteJsonLd
