import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import OktaAuth from '@okta/okta-auth-js'
import MaterialButton from 'components/Internal/MaterialButton'

export const OktaLogin = ({ loginReducer }) => {
  return (
    <p>
      <MaterialButton
        id='okta'
        onClick={(e) => {
          e.preventDefault()
          const authClient = new OktaAuth(loginReducer.authClientSettings)
          authClient.token.getWithRedirect({
            responseType: 'id_token',
            scopes: [
              'openid',
              'email',
              'profile',
              'netid',
              'directory',
            ],
          })
        }}
        primary
        wide
      >Log in with Notre Dame Campus Authentication</MaterialButton>
    </p>
  )
}

OktaLogin.propTypes = {
  loginReducer: PropTypes.object.isRequired,
}
const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}

export default connect(mapStateToProps)(OktaLogin)
