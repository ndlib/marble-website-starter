import React from 'react'
import PropTypes from 'prop-types'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

export const GatsbySeoNext = ({ title, description, url, image, base, pathname, siteTitle }) => {
  return (
    <>
      <GatsbySeo
        title={title}
        description={description}
        canonical={`${base}${pathname}`}
        openGraph={{
          url: url,
          title: title,
          description: description,
          images: [
            {
              url: image,
              width: 800,
              height: 600,
              alt: description,
            },
          ],
          site_name: siteTitle
        }}
        twitter={{
          handle: '@NDLibraries',
          site: '@NDLibraries',
          cardType: 'summary_large_image',
        }}
      />
    </>
  )
}

GatsbySeoNext.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  siteUrl: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
}

export default GatsbySeoNext
