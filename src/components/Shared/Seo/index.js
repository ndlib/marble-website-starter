import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import MetaTagGroup from './MetaTagGroup'
import { getOpenGraph, getTwitter } from './data'
import defaultImage from 'assets/logos/defaultOpenGraphLogo.png'

const SEO = ({
  title,
  description,
  image,
  lang,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || defaultImage
  const openGraph = getOpenGraph(title, metaDescription, metaImage)
  const twitter = getTwitter(site.siteMetadata.author, title, metaDescription, metaImage)

  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{ lang }}
        title={title}
        titleTemplate={title === site.siteMetadata.title ? site.siteMetadata.title : `%s | ${site.siteMetadata.title}`}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
        ]}
      />

      <MetaTagGroup tags={openGraph} />
      <MetaTagGroup tags={twitter} />
    </React.Fragment>
  )
}

SEO.defaultProps = {
  lang: `en`,
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
}

export default SEO
