import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { isLoggedIn } from 'utils/auth'
import { connect } from 'react-redux'

export const PrivateRoute = ({ children, location, requireLogin, loginReducer }) => {
  if (requireLogin && !isLoggedIn(loginReducer) && location.pathname !== `/login`) {
    // If we’re not logged in, redirect to the login page.
    navigate(`/login`)
    return null
  }

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
