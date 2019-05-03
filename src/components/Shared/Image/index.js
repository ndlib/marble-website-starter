import React from 'react'
import PropTypes from 'prop-types'
import noImage from 'assets/images/noImage.svg'

// Image component takes either an iiif image service and the basic parameters to render OR an src.
// iiif image service requires a region and a width OR a height.
// 'region' is defined in default props as 'full'.
// Since we may want to specify only a height, we do a check on width and height existing before we set a default width of 500.

// See https://iiif.io/api/image/2.1/#image-request-parameters for image server request parameters.
const Image = ({
  service, // iiif Image service
  region, // 'full', 'square', or format: `x,y,w,h`, `pct:x,y,w,h`
  size, // 'max', 'w,', ',h', 'pct:n', 'w,h', or '!w,h'
  src, // src to use if no service provided
  alt, // alt text for the image
}) => {
  const image = serviceURL(service, region, size) || src
  return (
    <picture>
      <img
        src={image || noImage}
        alt={alt}
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
}

Image.defaultProps = {
  region: 'full',
  size: '500,',
  alt: 'a static image',
}
export default Image

const serviceURL = (service, region, size) => {
  let image
  if (service && service !== '') {
    image = `${service}/${region}/${size}/0/default.jpg`
  }
  return image
}
