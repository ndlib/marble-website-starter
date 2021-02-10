import React from 'react'
import PropTypes from 'prop-types'
import GatsbySeoNext from './GatsbySeoNext'

export const SeoContent = ({
  title,
  url,
  description,
  image,
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
  author: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  siteUrl: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
}

export default SeoContent
