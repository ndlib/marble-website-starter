/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from 'components/Shared/Link'
import buildReferalState from 'utils/buildReferalState'
import sx from '../sx'
import { FaChevronRight } from 'react-icons/fa'

const CardWrapper = ({
  target,
  children,
  location,
  referal,
  onClick,
}) => {
  if (onClick) {
    return (
      <button
        sx={sx.clickableWrapper}
        onClick={(e) => {
          onClick(e)
        }}
      >
        <div className='chevronWrapper'>
          <FaChevronRight sx={sx.chevron} />
        </div>
        {children}
      </button>
    )
  } else if (target) {
    return (
      <Link
        to={target}
        variant='card'
        state={buildReferalState(location, referal)}
        sx={sx.clickableWrapper}
      >
        <div className='chevronWrapper'>
          <FaChevronRight sx={sx.chevron} />
        </div>
        {children}
      </Link>
    )
  }
  return (
    <>
      <div className='chevronWrapper'>
        <FaChevronRight sx={sx.chevron} />
      </div>
      {children}
    </>
  )
}

CardWrapper.propTypes = {
  target: PropTypes.string,
  children: PropTypes.node,
  location: PropTypes.object,
  referal: PropTypes.object,
  onClick: PropTypes.func,
}

CardWrapper.defaultProps = {
  children: null,
  cardClass: 'basicCard',
}
export default CardWrapper
