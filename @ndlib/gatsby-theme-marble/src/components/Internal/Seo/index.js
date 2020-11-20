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
  const itemTitle = title || typy(data, 'marbleItem.title').safeString
  const itemDescription = description || typy(data, 'marbleItem.description').safeString
  const itemAuthor = author || typy(data, 'marbleItem.metadata[0].value[0]').safeString
  const itemImage = typy(data, 'marbleItem.childrenMarbleFile[0].iiif.thumbnail').safeString
  return (
    <SeoContent
      title={getTitle(itemTitle, siteMetadata)}
      author={getAuthor(itemAuthor, siteMetadata)}
      image={getImage(itemImage)}
      description={getDescription(itemDescription, siteMetadata)}
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

export const getTitle = (title, siteMetadata) => {
  return title ||
    siteMetadata.title
}

export const getImage = (image, defaultImage) => {
  return image ||
    typy(defaultImage, 'publicURL').safeString
}

export const getDescription = (description, siteMetadata) => {
  return description ||
    typy(siteMetadata, 'description').safeString
}

export const getAuthor = (author, siteMetadata) => {
  return author ||
    typy(siteMetadata, 'author').safeString ||
    null
}

export const getDescriptionFromMetadata = (marbleItem, siteMetadata) => {
  return typy(marbleItem, 'description').safeString || siteMetadata.description
}
