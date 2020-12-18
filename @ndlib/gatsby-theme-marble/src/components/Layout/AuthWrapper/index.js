import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  putAuthSettingsInStore,
  getTokenAndPutInStore,
} from 'store/actions/loginActions'

export const AuthWrapper = ({ children, location, loginReducer, dispatch }) => {
  if (process.env.AUTH_CLIENT_ID && process.env.AUTH_CLIENT_ISSUER && process.env.AUTH_CLIENT_URL) {
    if (!loginReducer.authClientSettings) {
      dispatch(putAuthSettingsInStore(location))
    } else {
      dispatch(getTokenAndPutInStore(loginReducer, location))
    }
  }
  return (
    <>
      {children}
    </>
  )
}

AuthWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  loginReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthWrapper)
