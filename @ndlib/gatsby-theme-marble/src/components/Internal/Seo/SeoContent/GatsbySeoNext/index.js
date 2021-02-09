import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import PropTypes from 'prop-types'

const GatsbySeoNext = ({ title, author, description, image, url, siteTitle, base, pathname }) => {
  return (
    <>
      <GatsbySeo
        title={title}
        titleTemplate = '%s | Digital Collections'
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
          site_name: siteTitle,
        }}
        twitter={{
          handle: '@NDLibraries',
          site: siteTitle,
          cardType: 'summary_large_image',
        }}
      />
    </>
  )
}

GatsbySeoNext.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
}
export default GatsbySeoNext
