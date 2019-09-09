import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { isLoggedIn } from 'utils/auth'
import { connect } from 'react-redux'

export const PrivateRoute = ({ children, location, requireLogin, loginReducer }) => {
  checkAndHandleRedirect(loginReducer, requireLogin, location)
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  loginReducer: PropTypes.object,
  requireLogin: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  requireLogin: false,
}

const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}

export default connect(
  mapStateToProps
)(PrivateRoute)

// eslint-disable-next-line complexity
export const checkAndHandleRedirect = (loginReducer, requireLogin, location) => {
  if (!isLoggedIn(loginReducer) && requireLogin && location.pathname !== `/login`) {
    // If we’re not logged in, redirect to the login page.
    navigate(`/login`)
    return null
  } else if (isLoggedIn(loginReducer) && location.pathname === `/login`) {
    navigate(`/user/${loginReducer.user.username}`)
    return null
  }
}
