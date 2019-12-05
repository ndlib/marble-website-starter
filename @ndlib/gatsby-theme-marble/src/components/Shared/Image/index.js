import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Waypoint } from 'react-waypoint'
import noImage from 'assets/images/noImage.svg'

// Image component takes either an iiif image service and the basic parameters to render OR an src.
// iiif image service requires a region and a width OR a height.
// 'region' is defined in default props as 'full'.
// Since we may want to specify only a height, we do a check on width and height existing before we set a default width of 500.
// If a service is provided, Image component will attempt to generate a srcset with x descriptors based on the values provided in size.

// See https://iiif.io/api/image/2.1/#image-request-parameters for image server request parameters.
// eslint-disable-next-line complexity
const Image = ({
  service, // iiif Image service
  region, // 'full', 'square', or format: `x,y,w,h`, `pct:x,y,w,h`
  size, // 'max', 'w,', ',h', 'pct:n', 'w,h', or '!w,h'
  src, // src to use if no service provided
  alt, // alt text for the image
  title, // title attribute on iamge
  className, // class on the outer picture element
}) => {
  // derive image from image service OR src OR use the default noImage
  const imageSrc = src || serviceURL(service, region, size) || noImage
  // build a srcset from the service
  const srcSet = sourceSet(service, region, size)

  const [activeSrcSet, setSrcSet] = useState('')

  const onEnter = () => {
    setSrcSet(srcSet)
  }
  return (
    <Waypoint onEnter={onEnter}>
      <picture className={className}>
        <img
          src={imageSrc}
          srcSet={activeSrcSet}
          alt={alt || title}
          title={title || alt}
          style={{ width: '100%' }}
        />
      </picture>
    </Waypoint>
  )
}

Image.propTypes = {
  service: PropTypes.string,
  region: PropTypes.string,
  size: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
}

Image.defaultProps = {
  region: 'full',
  size: '1000,',
  alt: 'a static image',
  className: '',
}
export default Image

export const serviceURL = (service, region, size) => {
  let url
  if (service && service !== '') {
    url = `${service}/${region}/${size}/0/default.jpg`
  }
  return url
}

// generate a srcset based on the original image
export const sourceSet = (service, region, size) => {
  if (service) {
    const xDescriptors = [1, 1.5, 2]
    const set = []
    xDescriptors.forEach(xD => {
      const newSize = resize(size, xD)
      set.push(
        `${serviceURL(service, region, newSize)} ${xD}x`
      )
    })
    return set.join(', ')
  }
  return null
}

// attempt get a larger size of the imsage based on the passed size
export const resize = (originalSize, xDescriptor) => {
  const sizes = originalSize.split(',')
  sizes.forEach((size, index) => {
    const sizeNum = parseInt(size, 10)
    if (!isNaN(sizeNum)) {
      sizes[index] = Math.round(sizeNum * xDescriptor)
    }
  })
  return sizes.join()
}
