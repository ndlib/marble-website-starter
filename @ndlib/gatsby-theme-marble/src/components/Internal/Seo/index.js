import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import SeoContent from 'components/Internal/Seo/SeoContent'
export const Seo = ({
  data,
  location,
  title,
  author,
  description,
  noIndex,
}) => {
  const { site, file } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            languages {
              default
            }

          }
        }
        file(name: {eq: "openGraphLogo"}) {
          publicURL
        }
      }
    `
  )
  const { siteMetadata } = site
  return (
    <SeoContent
      url={getUrl(siteMetadata, location.pathname)}
      title={getTitle(title, data, siteMetadata)}
      author={getAuthor(author, data, siteMetadata)}
      image={getImage(data, file)}
      description={getDescription(description, data, siteMetadata)}
      pathname={location.pathname}
      siteTitle={typy(siteMetadata, 'title').safeString}
      siteUrl={typy(siteMetadata, 'siteUrl').safeString}
      lang={typy(siteMetadata, 'languages.default').safeString}
      noIndex={noIndex}
    />
  )
}

Seo.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  noIndex: PropTypes.bool,
}

export default Seo

export const getTitle = (title, data, siteMetadata) => {
  return title || typy(data, 'marbleItem.title').safeString || typy(siteMetadata, 'title').safeString
}

export const getUrl = (siteMetadata, location) => {
  return typy(siteMetadata, 'siteUrl').safeString + location
}

export const getImage = (data, defaultImage) => {
  return typy(data, 'marbleItem.childrenMarbleFile[0].iiif.thumbnail').safeString || typy(defaultImage, 'publicURL').safeString
}

export const getDescription = (description, data, siteMetadata) => {
  const metaDescription = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Summary'
  })
  return description || (typy(data, 'marbleItem.description').safeString || typy(metaDescription, 'value[0]').safeString) || typy(siteMetadata, 'description').safeString
}

export const getAuthor = (author, data, siteMetadata) => {
  const creator = typy(data, 'marbleItem.metadata').safeArray.find(md => {
    return md.label === 'Creator'
  })
  return author || typy(creator, 'value[0]').safeString || typy(siteMetadata, 'author').safeString ||
    null
}
