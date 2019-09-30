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
  const frontmatter = typy(data, 'remarkMarblePage.frontmatter').safeObject
  const { siteMetadata } = site
  return (
    <SeoContent
      title={getTitle(title, frontmatter, siteMetadata)}
      author={getAuthor(author, siteMetadata)}
      image={getImage(frontmatter, file)}
      description={getDescription(description, frontmatter, siteMetadata)}
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

export const getTitle = (title, frontmatter, siteMetadata) => {
  const lang = typy(siteMetadata, 'languages.default').safeString || 'none'
  return title ||
    typy(frontmatter, 'title').safeString ||
    typy(frontmatter, `iiifJson.label.[${lang}][0]`).safeString ||
    siteMetadata.title
}

export const getImage = (frontmatter, defaultImage) => {
  return typy(frontmatter, 'iiifJson.thumbnail[0].id').safeString ||
    typy(defaultImage, 'publicURL').safeString
}

// eslint-disable-next-line complexity
export const getDescription = (description, frontmatter, siteMetadata) => {
  const lang = typy(siteMetadata, 'languages.default').safeString || 'none'
  const metaDescription = description ||
    typy(frontmatter, 'description').safeString ||
    typy(frontmatter, `iiifJson.summary[${lang}][0]`).safeString ||
    getDescriptionFromMetadata(frontmatter, siteMetadata) ||
    typy(siteMetadata, 'description').safeString
  if (metaDescription.length > 150) {
    return `${metaDescription.substring(0, 149).trim()}…`
  }
  return metaDescription
}

export const getAuthor = (author, siteMetadata) => {
  return author ||
    typy(siteMetadata, 'author').safeString ||
    null
}

export const getDescriptionFromMetadata = (frontmatter, siteMetadata) => {
  const lang = typy(siteMetadata, 'languages.default').safeString || 'none'
  if (typy(frontmatter, `iiifJson.metadata`).isArray) {
    const { metadata } = frontmatter.iiifJson
    const summary = metadata.find(keyPair => {
      return keyPair.label[lang][0].toLowerCase() === 'summary'
    })
    return typy(summary, `value[${lang}][0]`).safeString
  }
  return null
}
