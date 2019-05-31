import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import Image from 'components/Shared/Image'
import getImageService from 'utils/getImageService'
import buildReferalState from 'utils/buildReferalState'
import './style.css'

const Card = ({
  target,
  label,
  image,
  iiifManifest,
  children,
  location,
  referal,
  cardClass,
}) => {
  const imageService = getImageService(iiifManifest)
  return (
    <Link to={target}
      state={buildReferalState(location, referal)}
      className={cardClass}
    >
      <article className='cardWrapper'>
        <figure className='cardFigure'>
          <Image
            src={image || null}
            service={imageService || null}
            alt={label}
            className='cardImage'
          />
          <figcaption className='cardCaption'>
            <h2>{label}</h2>
            <div className='cardAdditional'>
              {children}
            </div>
          </figcaption>
        </figure>
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
  cardClass: PropTypes.string,
}

Card.defaultProps = {
  children: null,
  cardClass: 'basicCard',
}
export default Card
