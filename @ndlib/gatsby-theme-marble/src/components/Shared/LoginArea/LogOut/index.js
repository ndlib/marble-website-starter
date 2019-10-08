import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import OktaAuth from '@okta/okta-auth-js'
import { logUserOut } from 'store/actions/loginActions'
import MaterialButton from 'components/Internal/MaterialButton'

export const LogOut = ({ dispatch, loginReducer }) => {
  return (
    <p>
      <MaterialButton
        id='okta'
        onClick={(e) => {
          e.preventDefault()
          const authClient = new OktaAuth({ ...loginReducer.authClientSettings })
          authClient.tokenManager.clear()
          dispatch(logUserOut())
        }}
        primary
        wide
      >Log out</MaterialButton>
    </p>
  )
}

LogOut.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOut)
