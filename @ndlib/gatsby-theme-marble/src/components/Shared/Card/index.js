import React from 'react'
import PropTypes from 'prop-types'
import { Styled } from 'theme-ui'
import Link from 'components/Internal/Link'
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
  const cardInternal = (
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
          <Styled.h3>{label}</Styled.h3>
          <div className='cardAdditional'>
            {children}
          </div>
        </figcaption>
      </figure>
    </article>
  )
  if (!target) {
    return (
      <div className={cardClass}>
        {cardInternal}
      </div>
    )
  }
  return (
    <Link
      to={target}
      state={buildReferalState(location, referal)}
      className={cardClass}
    >
      {cardInternal}
    </Link>
  )
}

Card.propTypes = {
  target: PropTypes.string,
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
