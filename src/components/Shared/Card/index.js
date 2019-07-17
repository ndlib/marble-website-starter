import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import Image from 'components/Shared/Image'
import ExteralLinkIcon from './ExteralLinkIcon'
import buildReferalState from 'utils/buildReferalState'
import './style.css'

const Card = ({
  target,
  label,
  image,
  children,
  location,
  referal,
  cardClass,
  imageService,
}) => {
  return (
    <Link
      to={target}
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
          <ExteralLinkIcon target={target} />
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
  imageService: PropTypes.string,
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
