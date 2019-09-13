import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { isLoggedIn } from 'utils/auth'
const LoginOrRedirect = ({ location, loginReducer }) => {
  if (isLoggedIn(loginReducer)) {
    navigate(`/user/${loginReducer.user.username}`)
    return null
  }
  // TODO put login page here instead of redirect
  navigate(`/login`)
  return null
}
LoginOrRedirect.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default LoginOrRedirect
