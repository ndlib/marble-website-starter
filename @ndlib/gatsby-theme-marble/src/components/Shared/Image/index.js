/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import noImage from 'assets/images/noImage.svg'
import { jsx } from 'theme-ui'
import sx from './sx'

// See https://iiif.io/api/image/2.1/#image-request-parameters for image server request parameters.

const Image = ({
  service, // iiif Image service
  region, // 'full', 'square', or format: `x,y,w,h`, `pct:x,y,w,h`
  size, // 'max', 'w,', ',h', 'pct:n', 'w,h', or '!w,h'
  src, // src to use if no service provided
  alt, // alt text for the image
  title, // title attribute on iamge
  loading, // image loading or lazy loading auto, lazy, eager
}) => {
  const imageSrc = src || serviceURL(service, region, size) || noImage
  return (
    <picture>
      {
        imageSrc.includes('static') ? null : (
          <source
            srcSet={imageSrc.replace('.jpg', '.webp')}
            type='image/webp'
          />
        )
      }
      <img
        src={imageSrc}
        alt={alt || ''}
        title={title}
        sx={sx.fallBack}
        loading={loading}
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
  loading: PropTypes.string,
}

Image.defaultProps = {
  region: 'full',
  size: '!250,250',
  alt: 'a static image',
  loading: 'lazy',
}
export default Image

export const serviceURL = (service, region, size) => {
  let url
  if (service && service !== '') {
    url = `${service}/${region}/${size}/0/default.jpg`
  }
  return url
}
