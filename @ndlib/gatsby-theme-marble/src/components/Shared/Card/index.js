/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { BaseStyles, jsx, Styled } from 'theme-ui'
import Link from 'components/Internal/Link'
import Image from 'components/Shared/Image'
import ExteralLinkIcon from './ExteralLinkIcon'
import buildReferalState from 'utils/buildReferalState'
import { LayoutContext } from 'components/Internal/DisplayViewToggle'
import sx from './sx'

// eslint-disable-next-line complexity
const Card = ({
  target,
  label,
  image,
  children,
  location,
  referal,
  imageService,
  imageRegion,
  onClick,
}) => {
  const wide = useContext(LayoutContext) === 'list'
  const cardInternal = (
    <BaseStyles>
      <article sx={sx.wrapper(wide)}>
        <figure sx={sx.figure}>
          <Image
            src={image || null}
            service={imageService || null}
            region={imageRegion || null}
            alt={label}
            sxStyle={sx.imageStyle(wide)}
          />
          <ExteralLinkIcon target={target} />
          <figcaption sx={sx.figcaption(wide)}>
            <Styled.h3>{label}</Styled.h3>
            <div className='cardAdditional'>
              <div className='fadeOut' />
              {children}
            </div>
          </figcaption>
        </figure>
      </article>
    </BaseStyles>
  )
  if (!target && onClick) {
    return (
      <button
        sx={sx.clickableWrapper}
        onClick={(e) => {
          onClick(e)
        }}
      >
        {cardInternal}
      </button>
    )
  } else if (!target) {
    return (
      <React.Fragment>
        {cardInternal}
      </React.Fragment>
    )
  }
  return (
    <Link
      to={target}
      state={buildReferalState(location, referal)}
      sx={sx.clickableWrapper}
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
  imageRegion: PropTypes.string,
  children: PropTypes.node,
  location: PropTypes.object,
  referal: PropTypes.object,
  onClick: PropTypes.func,
}

Card.defaultProps = {
  children: null,
  cardClass: 'basicCard',
}
export default Card
