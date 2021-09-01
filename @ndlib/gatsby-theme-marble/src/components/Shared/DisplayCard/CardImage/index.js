/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import noImage from 'assets/images/noImage.svg'
import sx from '../sx.js'

const CardImage = ({ image, alt }) => {
  if (!image) {
    image = noImage
  }

  return (
    <picture sx={sx.displayCard.image}>
      {
        image && image.includes('static')
          ? null
          : (
            <source
              srcSet={image.replace('.jpg', '.webp')}
              type='image/webp'
            />
          )
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
