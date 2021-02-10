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
  lang,
  noIndex,
  noFollow,
}) => {
  return (
    <GatsbySeoNext
      title={title}
      description={description}
      author={author}
      url={url}
      image={image}
      pathname={pathname}
      siteTitle={siteTitle}
      base={siteUrl}
      lang={lang}
      noIndex={noIndex}
      noFollow={noFollow}
    />
  )
}

SeoContent.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  lang: PropTypes.string,
  noIndex: PropTypes.bool,
  noFollow: PropTypes.bool,
  siteUrl: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
}

SeoContent.defaultProps = {
  lang: 'none',
  noIndex: false,
}

export default SeoContent
