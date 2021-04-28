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
  const relatedLocation = ''
  const copyrightStatus = ''
  const publisher = ''
  const materialType = ''
  const physicalCharacteristic = ''
  const language = ''
  const acquisition = ''
  const accessionNumber = ''
  const campusLocation = ''
  const identifier = ''

  return (
    <SeoContent
      title={helper.getTitle(title, data, siteMetadata)}
      url={helper.getUrl(siteMetadata, location.pathname)}
      author={helper.getAuthor(author, data, siteMetadata)}
      date={helper.getFieldValue(date, 'Date', data)}
      image={helper.getImage(data, file)}
      description={helper.getDescription(description, data, siteMetadata)}
      classification={helper.getFieldValue(classification, 'Classification', data)}
      creditText={helper.getFieldValue(creditText, 'Credit Line', data)}
      dimensions={helper.getFieldValue(dimensions, 'Dimensions', data)}
      relatedLocation={helper.getFieldValue(relatedLocation, 'Related Location', data)}
      copyrightStatus={helper.getFieldValue(copyrightStatus, 'Copyright Status', data)}
      publisher={helper.getFieldValue(publisher, 'Publisher', data)}
      materialType={helper.getFieldValue(materialType, 'Material Type', data)}
      physicalCharacteristic={helper.getFieldValue(physicalCharacteristic, 'Genre/Physical Characteristic', data)}
      language={helper.getFieldValue(language, 'Language', data)}
      acquisition={helper.getFieldValue(acquisition, 'Immediate Source of Acquisition', data)}
      accessionNumber={helper.getFieldValue(accessionNumber, 'Accession Number', data)}
      identifier={helper.getFieldValue(identifier, 'Identifier', data)}
      campusLocation={helper.getFieldValue(campusLocation, 'Campus Location', data)}
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

