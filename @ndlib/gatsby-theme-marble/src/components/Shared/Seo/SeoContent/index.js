import React from 'react'
import PropTypes from 'prop-types'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import WebsiteJsonLd from './WebsiteJsonLd'
import PhotographJsonLd from './PhotographJsonLd'

export const SeoContent = ({ thumbnail, title, author, description, date, url, image, pathname, siteUrl, siteTitle, lang, noIndex, noFollow, classification, creditText, dimensions, data }) => {
  console.log(data)
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
      { classification === 'photographs'
        ?
        <PhotographJsonLd
          title={title}
          description={description}
          author={author}
          date={date}
          image={image}
          creditText={creditText}
          dimensions={dimensions}
          thumbnail={thumbnail}
        />
        : null }
    </>
  )
}

SeoContent.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  noIndex: PropTypes.bool,
  noFollow: PropTypes.bool,
  pathname: PropTypes.string,
  siteUrl: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
}

export default SeoContent
