/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import Gravatar from 'components/Shared/Gravatar'
import { getData } from 'utils/api'

export const UserCartouche = ({ user, loginReducer }) => {
  const [fullUser, setUser] = useState(user)

  useEffect(() => {
    const abortController = new AbortController()
    getData({
      loginReducer: loginReducer,
      contentType: 'user-id',
      id: user.uuid,
      successFunc: (data) => {
        setUser(data)
      },
      errorFunc: (e) => {
        console.error(e)
      },
      signal: abortController.signal,
    })
    return () => {
      abortController.abort()
    }
  }, [loginReducer, user.uuid])

  if (!fullUser.userName || !fullUser.email || !fullUser.fullName) {
    return null
  }
  return (
    <button
      onClick={() => {
        navigate(`/user/${fullUser.userName}`)
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
          email={fullUser.email}
          size={22}
        />
      </span>
      {fullUser.fullName}
    </button>
  )
}

UserCartouche.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    userName: PropTypes.string,
    uuid: PropTypes.string,
  }).isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(UserCartouche)
