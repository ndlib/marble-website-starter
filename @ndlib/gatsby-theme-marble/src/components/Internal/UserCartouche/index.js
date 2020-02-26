import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import Gravatar from 'components/Internal/Gravatar'
import { getData } from 'utils/api'
import style from './style.module.css'

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
    <span
      role='button'
      onClick={() => {
        navigate(`/user/${fullUser.userName}`)
      }}
      className={style.cartouche}
    >
      <span className={style.gravatarWrapper}>
        <Gravatar
          email={fullUser.email}
          size={22}
        />
      </span>
      {fullUser.fullName}
    </span>
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
