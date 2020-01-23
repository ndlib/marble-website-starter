import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import typy from 'typy'
import OktaAuth from '@okta/okta-auth-js'
import { setAuthClient, handleLogin } from 'store/actions/loginActions'

export const AuthWrapper = ({ children, location, loginReducer, dispatch }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            useLogin
            authClient {
              url
              clientId
              issuer
            }
          }
        }
      }
    `,
  )
  if (typy(site, 'siteMetadata.useLogin').safeBoolean &&
  typy(site, 'siteMetadata.authClient').safeObject) {
    if (!loginReducer.authClientSettings) {
      putAuthSettingsInStore(site, location, dispatch)
    } else {
      putLoggedInUserInStore(loginReducer, location, dispatch)
    }
  }
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
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

export const putAuthSettingsInStore = (site, location, dispatch) => {
  const { url, clientId, issuer } = site.siteMetadata.authClient
  const authClientSettings = {
    url: url,
    clientId: clientId,
    redirectUri: `${location.origin}/user`,
    issuer: issuer,
    ignoreSignature: true,
    tokenManager: {
      storage: 'sessionStorage',
      storageKey: 'marble',
    },
  }
  dispatch(setAuthClient(authClientSettings))
}

export const putLoggedInUserInStore = (loginReducer, location, dispatch) => {
  if (loginReducer.authClientSettings) {
    const authClient = new OktaAuth(loginReducer.authClientSettings)
    try {
      authClient.tokenManager.get('idToken')
        .then(idToken => {
          if (idToken) {
            if (loginReducer.status === 'STATUS_NOT_LOGGED_IN') {
              dispatch(handleLogin(idToken))
            }
          // If ID Token isn't found, try to parse it from the current URL
          } else if (location.hash) {
            authClient.token.parseFromUrl()
              .then(idToken => {
                // Store parsed token in Token Manager
                authClient.tokenManager.add('idToken', idToken)
                dispatch(handleLogin(idToken))
              })
          }
        })
    } catch {
      console.error('Could not access tokenManager.')
    }
  }
}
