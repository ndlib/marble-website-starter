import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import Image from 'components/Shared/Image'
import getImageService from 'utils/getImageService'
import './style.css'

const Card = ({
  target,
  label,
  image,
  iiifManifest,
  children,
  location,
  referal,
}) => {
  const imageService = getImageService(iiifManifest)
  return (
    <Link to={target}
      state={buildState(location, referal)}
    >
      <article className='cardWrapper'>
        <figure className='cardFigure'>
          <Image
            src={image || null}
            service={imageService || null}
            alt={label}
            className='cardImage'
          />
          <figcaption className='cardCaption'>{label}</figcaption>
        </figure>
        <div className='cardAdditional'>
          {children}
        </div>
      </article>
    </Link>
  )
}

Card.propTypes = {
  target: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  image: PropTypes.string,
  iiifManifest: PropTypes.object,
  children: PropTypes.node,
  location: PropTypes.object,
  referal: PropTypes.object,
}

Card.defaultProps = {
  children: null,
}
export default Card

const buildState = (location, referal) => {
  if (location && referal) {
    return {
      referal: referal,
    }
  }
  return null
}
