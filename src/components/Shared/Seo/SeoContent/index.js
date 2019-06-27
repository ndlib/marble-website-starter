import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import CanonicalLink from './CanonicalLink'
import MetaTagGroup from './MetaTagGroup'
import { getOpenGraph, getTwitter } from './data'

export const SeoContent = ({
  title,
  description,
  image,
  lang,
  pathname,
  site,
  defaultImage,
}) => {
  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || defaultImage
  const openGraph = getOpenGraph(title, metaDescription, metaImage)
  const twitter = getTwitter(site.siteMetadata.author, title, metaDescription, metaImage)
  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{ lang }}
        title={title}
        titleTemplate={title === site.siteMetadata.title ? site.siteMetadata.title : `${title} | ${site.siteMetadata.title}`}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
        ]}
      />
      <CanonicalLink base={site.siteMetadata.siteUrl} pathname={pathname} />
      <MetaTagGroup tags={openGraph} />
      <MetaTagGroup tags={twitter} />
      {
        /// REMOVE WHEN READY
        <Helmet>
          <meta name='robots' content='noindex' />
        </Helmet>
      }
    </React.Fragment>
  )
}

SeoContent.defaultProps = {
  lang: `en`,
}

SeoContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  pathname: PropTypes.string,
  site: PropTypes.shape({
    siteMetadata: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      siteUrl: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  defaultImage: PropTypes.string.isRequired,
}

export default (props) => {
  return (
    <StaticQuery
      query={graphql`
      {
        file(name: {eq: "openGraphLogo"}) {
          publicURL
        }
      }
    `
      }
      render={data => (
        <SeoContent defaultImage={data.file.publicURL} {...props} />
      )}
    />
  )
}
