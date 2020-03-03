/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
const NoPortfolios = ({ isOwner = false }) => {
  const sx = {
    border: '1px solid',
    borderColor: 'gray.1',
    color: 'gray.4',
    margin: '1rem',
    padding: '.5rem',
    textAlign: 'center',
    width: 'calc(100% - 2rem)',
  }
  if (isOwner) {
    return (
      <div sx={sx}>
        <p>You have not created any portfolios yet.</p>
      </div>
    )
  }
  return (
    <div sx={sx}>
      <p>This user does not have any public portfolios.</p>
    </div>
  )
}

NoPortfolios.propTypes = {
  isOwner: PropTypes.bool,
}

export default NoPortfolios
