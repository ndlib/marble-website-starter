import React from 'react'
import PropTypes from 'prop-types'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

export const GatsbySeoNext = ({ title, description, url, image, base, pathname, siteTitle }) => {
  return (
    <>
      <GatsbySeo
        title={title}
        description={description}
      />
    </>
  )
}

GatsbySeoNext.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  siteUrl: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
}

export default GatsbySeoNext
