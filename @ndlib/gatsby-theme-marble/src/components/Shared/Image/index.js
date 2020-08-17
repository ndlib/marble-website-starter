/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import queryString from 'query-string'
import noImage from 'assets/images/noImage.svg'
import { jsx } from 'theme-ui'
import sx from './sx'

// See https://iiif.io/api/image/2.1/#image-request-parameters for image server request parameters.
// eslint-disable-next-line complexity
const Image = ({
  gatsbyImage, // gatsbyImage
  service, // iiif Image service
  region, // 'full', 'square', or format: `x,y,w,h`, `pct:x,y,w,h`
  size, // 'max', 'w,', ',h', 'pct:n', 'w,h', or '!w,h'
  src, // src to use if no service provided
  alt, // alt text for the image
  title, // title attribute on iamge
}) => {
  let debug = false
  try {
    debug = queryString.parse(window.location.search).debug === 'true'
  } catch {
    debug = false
  }
  if (gatsbyImage) {
    return (
      <Img
        fluid={gatsbyImage}
        alt={alt || ''}
        title={title}
        fit='INSIDE'
      />
    )
  }
  // derive image from image service OR src OR use the default noImage
  const imageSrc = src || serviceURL(service, region, size) || noImage

  return (
    <picture sx={debug ? sx.imageFail : null}>
      <img
        src={imageSrc}
        alt={alt || ''}
        title={title}
        sx={sx.fallBack}
      />
    </picture>
  )
}

Image.propTypes = {
  gatsbyImage: PropTypes.object,
  service: PropTypes.string,
  region: PropTypes.string,
  size: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
}

Image.defaultProps = {
  region: 'full',
  size: '!250,250',
  alt: 'a static image',
}
export default Image

export const serviceURL = (service, region, size) => {
  let url
  if (service && service !== '') {
    url = `${service}/${region}/${size}/0/default.jpg`
  }
  return url
}
