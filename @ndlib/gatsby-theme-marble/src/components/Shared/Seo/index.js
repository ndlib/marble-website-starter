import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import SeoContent from 'components/Shared/Seo/SeoContent'
import * as helper from './helpers'
export const Seo = ({
  data,
  location,
  title,
  author,
  description,
  noIndex = false,
  noFollow = false,
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
    `,
  )
  const { siteMetadata } = site
  const classification = ''
  const creditText = ''
  const dimensions = ''
  const date = ''
  const keywords = ''

  return (
    <SeoContent
      url={helper.getUrl(siteMetadata, location.pathname)}
      title={helper.getTitle(title, data, siteMetadata)}
      author={helper.getAuthor(author, data, siteMetadata)}
      date={helper.getFieldValue(date, 'Date', data)}
      image={helper.getImage(data, file)}
      description={helper.getDescription(description, data, siteMetadata)}
      classification={helper.getFieldValue(classification, 'Classification', data)}
      creditText={helper.getFieldValue(creditText, 'Credit Line', data)}
      dimensions={helper.getFieldValue(dimensions, 'Dimensions', data)}
      keywords={helper.getKeywords(keywords, data)}
      thumbnail={helper.getThumbnail(data, file)}
      pathname={location.pathname}
      siteTitle={typy(siteMetadata, 'title').safeString}
      siteUrl={typy(siteMetadata, 'siteUrl').safeString}
      lang={typy(siteMetadata, 'languages.default').safeString}
      noIndex={noIndex}
      noFollow={noFollow}
      data={data}
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
  noFollow: PropTypes.bool,
}

export default Seo

