import React from 'react'
import PropTypes from 'prop-types'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import WebsiteJsonLd from './WebsiteJsonLd'
import SchemaJsonLd from './SchemaJsonLd'
import HubJsonLd from './HubJsonLd'

export const SeoContent = (props) => {
  const {
    thumbnail,
    title,
    author,
    description,
    date,
    url,
    keywords,
    image,
    pathname,
    siteUrl,
    siteTitle,
    lang,
    noIndex,
    noFollow,
    classification,
    creditText,
    dimensions,
    relatedLocation,
    copyrightStatus,
    publisher,
    materialType,
    physicalCharacteristic,
    language,
    acquisition,
    accessionNumber,
    identifier,
    campusLocation,
  } = props
  const titleFix = title.includes('Digital Collections') ? title : '%s | Digital Collections'
  return (
    <>
      <GatsbySeo
        title={title}
        titleTemplate={titleFix}
        description={description}
        canonical={`${siteUrl}${pathname}`}
        noindex={noIndex}
        nofollow={noFollow}
        language={lang}
        openGraph={{
          type: 'website',
          url: url,
          title: title,
          description: description,
          images: [
            {
              url: thumbnail,
              width: 250,
              height: 197,
              alt: description,
            },
            {
              url: image,
              width: 800,
              height: 600,
              alt: description,
            },
          ],
          site_name: siteTitle,
        }}
        twitter={{
          handle: author,
          site: '@NDLibraries',
          cardType: 'summary_large_image',
        }}
      />
      <WebsiteJsonLd siteUrl={siteUrl} pathname={pathname} />
      <SchemaJsonLd
        pathname={pathname}
        title={title}
        description={description}
        author={author}
        date={date}
        url={url}
        image={image}
        creditText={creditText}
        classification={classification}
        copyrightStatus={copyrightStatus}
        keywords={keywords}
        dimensions={dimensions}
        thumbnail={thumbnail}
        relatedLocation={relatedLocation}
        publisher={publisher}
        materialType={materialType}
        physicalCharacteristic={physicalCharacteristic}
        language={language}
        acquisition={acquisition}
        accessionNumber={accessionNumber}
        identifier={identifier}
        campusLocation={campusLocation}
      />
      <HubJsonLd
        pathname={pathname}
        title={title}
        description={description}
        author={author}
        date={date}
        url={url}
        image={image}
        creditText={creditText}
        classification={classification}
        copyrightStatus={copyrightStatus}
        keywords={keywords}
        dimensions={dimensions}
        thumbnail={thumbnail}
        relatedLocation={relatedLocation}
        publisher={publisher}
        materialType={materialType}
        physicalCharacteristic={physicalCharacteristic}
        language={language}
        acquisition={acquisition}
        accessionNumber={accessionNumber}
        identifier={identifier}
        campusLocation={campusLocation}
      />
    </>
  )
}

SeoContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  author:PropTypes.string.isRequired,
  date: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  thumbnail: PropTypes.string,
  lang: PropTypes.string,
  noIndex: PropTypes.bool,
  noFollow: PropTypes.bool,
  pathname: PropTypes.string,
  siteUrl: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  creditText: PropTypes.string,
  classification: PropTypes.string,
  copyrightStatus: PropTypes.string,
  keywords: PropTypes.string,
  dimensions: PropTypes.string,
  relatedLocation: PropTypes.string,
  publisher: PropTypes.string,
  materialType: PropTypes.string,
  physicalCharacteristic: PropTypes.string,
  language: PropTypes.string,
  acquisition: PropTypes.string,
  accessionNumber: PropTypes.string,
  identifier: PropTypes.string,
  campusLocation: PropTypes.string,
}

export default SeoContent
