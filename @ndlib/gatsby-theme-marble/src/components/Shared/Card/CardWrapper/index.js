/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from 'components/Internal/Link'
import buildReferalState from 'utils/buildReferalState'
import sx from '../sx'

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
        {children}
      </button>
    )
  } else if (target) {
    return (
      <Link
        to={target}
        state={buildReferalState(location, referal)}
        sx={sx.clickableWrapper}
      >
        {children}
      </Link>
    )
  }
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
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
