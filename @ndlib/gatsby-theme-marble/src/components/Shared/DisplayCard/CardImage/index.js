/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import noImage from 'assets/images/noImage.svg'
import sx from '../sx.js'

const CardImage = ({ image, alt }) => {
  if (!image) {
    image = noImage
  }
  console.log(image)
  return (
    <picture sx={sx.displayCard.image}>
      {
        // only make a source set for images coming from our image server
        image.includes('image-iiif')
          ? (
            <source
              srcSet={image.replace(/\.(jpg|png)/g, '.webp')}
              type='image/webp'
            />
          )
          : null
      }
      <img
        src={image}
        alt={alt}
      />
    </picture>
  )
}

CardImage.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
}
CardImage.defaultProps = {
  alt: '',
}
export default CardImage
