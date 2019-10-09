import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { isLoggedIn } from 'utils/auth'

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
  loginReducer: PropTypes.object.isRequired,
  requireLogin: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  requireLogin: false,
}

const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}

export default connect(
  mapStateToProps,
)(PrivateRoute)

// eslint-disable-next-line complexity
export const checkAndHandleRedirect = (loginReducer, requireLogin, location) => {
  if (!isLoggedIn(loginReducer) && requireLogin && location.pathname !== `/user`) {
    // If we’re not logged in, redirect to the login page.
    navigate(`/user`)
    return null
  } else if (isLoggedIn(loginReducer) && location.pathname === `/user`) {
    navigate(`/user/${loginReducer.user.username}`)
    return null
  }
}
