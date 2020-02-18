import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserLayout from './UserLayout'
import UserBody from './UserBody'
import NoUser from './NoUser'
import Loading from 'components/Internal/Loading'

const User = ({ loginReducer, userName, location, edit }) => {
  const [user, setUser] = useState({ userName: userName })
  const [content, setContent] = useState(<Loading />)

  const fetchData = useCallback(() => {
    if (loginReducer.userContentPath) {
      fetch(`${loginReducer.userContentPath}user/${userName}`)
        .then(result => {
          return result.json()
        })
        .then(userData => {
          setUser(userData)
          setContent(<UserBody
            user={userData}
            edit={edit}
          />)
        })
        .catch(() => {
          setContent(<NoUser userName={userName} />)
        })
    }
  }, [loginReducer.userContentPath, userName, edit])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <UserLayout
      user={user}
      location={location}
    >
      {content}
    </UserLayout>

  )
}
User.propTypes = {
  userName: PropTypes.string,
  edit: PropTypes.bool,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(User)
