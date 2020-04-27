/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { Styled, jsx } from 'theme-ui'
import { Link } from 'gatsby'
import sx from './sx'

const MiniCard = ({ label, target }) => {
  return (
    <div sx={sx.wrapper}>
      <Link to={target} sx={sx.link}>
        <Styled.h3>{label}</Styled.h3>
      </Link>
    </div>
  )
}

MiniCard.propTypes = {
  label: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
}

export default MiniCard
