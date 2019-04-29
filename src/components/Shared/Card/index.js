import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import style from './style.module.css'
import noImage from 'assets/images/noImage.svg'
const Card = ({
  target,
  label,
  image,
  children,
}) => {
  return (
    <Link to={target}>
      <article>
        <figure>
          <img src={image || noImage} alt={label} />
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
  children: PropTypes.node,
}

Card.defaultProps = {
  children: null,
}
export default Card
