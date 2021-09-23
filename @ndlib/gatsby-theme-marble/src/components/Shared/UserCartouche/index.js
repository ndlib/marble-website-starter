/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Gravatar from 'components/Shared/Gravatar'

export const UserCartouche = ({ user }) => {
  if (!user.portfolioUserId || !user.email || !user.fullName) {
    return null
  }
  return (
    <button
      onClick={() => {
        navigate(`/user/${user.portfolioUserId}`)
      }}
      className='cartouche'
      sx={{
        backgroundColor: '#fff',
        border: '1px solid #dedede',
        borderRadius: '20px',
        color: '#333',
        cursor: 'pointer',
        fontSize: '1rem',
        fontStyle: 'normal',
        lineHeight: '1.45rem',
        margin: '0 0.5rem',
        padding: '0.25rem 1rem',
        textDecoration: 'none',
        verticalAlign: 'baseline',
      }}
    >
      <span
        className='gravatarWrapper'
        sx={{
          display: 'inline-block',
          height: '22px',
          marginRight: '.25rem',
          overflow: 'hidden',
          verticalAlign: 'top',
          width: '22px',
        }} >
        <Gravatar
          email={user.email}
          size={22}
        />
      </span>
      {user.fullName}
    </button>
  )
}

UserCartouche.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    portfolioUserId: PropTypes.string,
  }).isRequired,
}

export default UserCartouche
