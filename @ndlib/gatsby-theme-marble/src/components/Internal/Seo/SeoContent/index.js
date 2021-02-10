import React from 'react'
import PropTypes from 'prop-types'
import GatsbySeoNext from '@ndlib/gatsby-theme-marble/src/components/Internal/Seo/SeoContent/GatsbySeoNext'

export const SeoContent = ({
  title,
  url,
  description,
  image,
  lang,
  pathname,
  author,
  siteTitle,
  siteUrl,
}) => {
  return (
    <GatsbySeoNext
      title={title}
      description={description}
      author={author}
      url={url}
      image={image}
      base='http://marble.nd.edu'  
      pathname={pathname}
      siteTitle={siteTitle}
      siteUrl={siteUrl}
    />
  )
}

SeoContent.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  pathname: PropTypes.string,
  author: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  noIndex: PropTypes.bool,
  seeAlso: PropTypes.string,
}

export default SeoContent
