import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import CanonicalLink from './CanonicalLink'
// import SchemaLink from './SchemaLink'
import MetaTagGroup from './MetaTagGroup'
import { getOpenGraph, getTwitter } from './data'

export const SeoContent = ({
  title,
  description,
  image,
  lang,
  pathname,
  author,
  siteTitle,
  siteUrl,
  noIndex,
}) => {
  const openGraph = getOpenGraph(title, description, image)
  const twitter = getTwitter(author, title, description, image)
  const titleFix = title.includes('Mirador Viewer') ? title : `${title} | ${siteTitle}`
  // console.log('=======================================================')
  // console.log('title:', title)
  // console.log('author:', author)
  // console.log('description:', description)
  // console.log('image:', image)
  // console.log('lang:', lang)
  // console.log('pathname:', pathname)
  // console.log('siteTitle:', siteTitle)
  // console.log('siteUrl:', siteUrl)
  // console.log('noIndex:', noIndex)
  // console.log('seeAlso:', seeAlso)
  // console.log('=======================================================')
  let indexable = null
  if (noIndex === true) {
    indexable = (
      <Helmet>
        <meta name='robots' content='noindex' />
      </Helmet>
    )
  }
  return (
    <>
      <Helmet
        htmlAttributes={{ lang }}
        title={title}
        titleTemplate={title === siteTitle ? `${siteTitle}` : `${titleFix}`}
      />
      <CanonicalLink base={siteUrl} pathname={pathname} />
      <MetaTagGroup tags={openGraph} />
      <MetaTagGroup tags={twitter} />
      {indexable}
    </>
  )
}

SeoContent.propTypes = {
  title: PropTypes.string.isRequired,
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

SeoContent.defaultProps = {
  lang: 'none',
  noIndex: false,
}

export default SeoContent
