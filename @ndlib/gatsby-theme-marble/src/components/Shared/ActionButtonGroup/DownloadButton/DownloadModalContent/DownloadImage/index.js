/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import ImagePreview from './ImagePreview'
import ImagePager from './ImagePager'
import ImageSettings from './ImageSettings'
import MaterialButton from 'components/Internal/MaterialButton'
import download from 'utils/download'
import {
  copyrightCanDownload,
  imageUrl,
  imageName,
  getImagesFromManifest,
} from './utils'
import sx from './sx'

const DownloadImage = ({ iiifManifest }) => {
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState(0)
  const [size, setSize] = useState('full')
  const [format, setFormat] = useState('jpg')

  useEffect(() => {
    setImages(getImagesFromManifest(iiifManifest))
  }, [iiifManifest])

  if (images.length < 1 || !copyrightCanDownload(iiifManifest)) {
    return (
      <div sx={sx.wrapper}>
        <p sx={sx.image}>Image Download Unavailable.</p>
      </div>
    )
  }
  return (
    <React.Fragment>
      <ImagePreview
        sxStyle={sx}
        images={images}
        selected={selected}
      />
      <ImagePager
        sxStyle={sx}
        images={images}
        selected={selected}
        setSelected={setSelected}
      />
      <ImageSettings
        sxStyle={sx}
        size={size}
        setSize={setSize}
        format={format}
        setFormat={setFormat}
      />
      <div sx={sx.controlWrapper}>
        <MaterialButton
          onClick={() => {
            download(
              imageUrl(images, selected, size, format),
              imageName(iiifManifest, images, selected, format),
            )
          }}
          primary
          wide
        >Download Image</MaterialButton>
      </div>
    </React.Fragment>
  )
}

DownloadImage.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default DownloadImage
