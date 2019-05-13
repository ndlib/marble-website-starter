import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { isLoggedIn } from 'utils/auth'
import { connect } from 'react-redux'

export const PrivateRoute = ({ children, location, testLogin, loginReducer }) => {
  if (testLogin && !isLoggedIn(loginReducer) && location.pathname !== `/login`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/login`)
    return null
  }

  return (
    <div>
      {children}
    </div>
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  loginReducer: PropTypes.object.isRequired,
  testLogin: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  testLogin: false,
}

const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}

export default connect(
  mapStateToProps
)(PrivateRoute)
