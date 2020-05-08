/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const ImagePreview = ({ sxStyle, images, selected }) => {
  return (
    <picture sx={sxStyle.wrapper}>
      <img
        src={images[selected].replace('full/full', 'full/,600')}
        alt='Preview'
        sx={sxStyle.image}
      />
    </picture>
  )
}

ImagePreview.propTypes = {
  sxStyle: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
}

export default ImagePreview
