import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserLayout from './UserLayout'
import UserBody from './UserBody'
import NoUser from './NoUser'
import Loading from 'components/Internal/Loading'
import { getData } from 'utils/api'

const User = ({ loginReducer, userName, location, edit }) => {
  const [user, setUser] = useState({ userName: userName })
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()
    getData({
      loginReducer: loginReducer,
      contentType: 'user',
      id: userName,
      successFunc: (data) => {
        setUser(data)
        setContent(<UserBody
          user={data}
          edit={edit}
        />)
      },
      errofFunc: () => {
        setContent(<NoUser userName={userName} />)
      },
    })
    return () => {
      abortController.abort()
    }
  }, [loginReducer, userName, edit])

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
