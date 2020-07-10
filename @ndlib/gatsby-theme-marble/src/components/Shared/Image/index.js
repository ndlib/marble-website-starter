/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import noImage from 'assets/images/noImage.svg'
import { jsx } from 'theme-ui'
import sx from './sx'

// See https://iiif.io/api/image/2.1/#image-request-parameters for image server request parameters.
// eslint-disable-next-line complexity
const Image = ({
  service, // iiif Image service
  region, // 'full', 'square', or format: `x,y,w,h`, `pct:x,y,w,h`
  size, // 'max', 'w,', ',h', 'pct:n', 'w,h', or '!w,h'
  src, // src to use if no service provided
  alt, // alt text for the image
  title, // title attribute on iamge
  inCard, // image is in a card and need different styling
}) => {
  // derive image from image service OR src OR use the default noImage
  const imageSrc = src || serviceURL(service, region, size) || noImage

  return (
    <picture sx={sx.picture(inCard)}>
      <img
        src={imageSrc}
        alt={alt || ''}
        title={title || null}
        sx={sx.image(inCard)}
      />
    </picture>
  )
}

Image.propTypes = {
  service: PropTypes.string,
  region: PropTypes.string,
  size: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  inCard: PropTypes.bool,
}

Image.defaultProps = {
  region: 'full',
  size: '1000,',
  alt: 'a static image',
  inCard: false,
}
export default Image

export const serviceURL = (service, region, size) => {
  let url
  if (service && service !== '') {
    url = `${service}/${region}/${size}/0/default.jpg`
  }
  return url
}
