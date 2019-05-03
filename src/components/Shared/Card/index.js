import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import Image from 'components/Shared/Image'
import getImageService from 'utils/getImageService'
import style from './style.module.css'

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
      <article>
        <figure>
          <Image
            src={image || null}
            service={imageService || null}
            alt={label}
          />
          <figcaption>{label}</figcaption>
        </figure>
        <div className={style.additional}>
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
