import '@okta/okta-auth-js/polyfill'
import { OktaAuth } from '@okta/okta-auth-js/cjs'
import typy from 'typy'
import { userIdFromClaims } from 'utils/auth'
export const GET_AUTHENTICATION = 'GET_AUTHENTICATION'
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const SET_NOT_LOGGED_IN = 'SET_NOT_LOGGED_IN'
export const GET_USER = 'GET_USER'
export const NO_USER = 'NO_USER'
export const LOG_USER_IN = 'LOG_USER_IN'
export const LOG_USER_OUT = 'LOG_USER_OUT'
export const SET_AUTH_CLIENT = 'SET_AUTH_CLIENT'
export const STATUS_FRESH_LOAD_NOT_LOGGED_IN = 'STATUS_FRESH_LOAD_NOT_LOGGED_IN'
export const STATUS_NOT_LOGGED_IN = 'STATUS_NOT_LOGGED_IN'
export const STATUS_TRYING_AUTHENTICATION = 'STATUS_TRYING_AUTHENTICATION'
export const STATUS_AUTHENTICATED = 'STATUS_AUTHENTICATED'
export const STATUS_AUTHENTICATION_FAILED = 'STATUS_AUTHENTICATION_FAILED'
export const STATUS_AUTHENTICATED_TRYING_LOGIN = 'STATUS_AUTHENTICATED_TRYING_LOGIN'
export const STATUS_AUTHENTICATED_NOT_LOGGED_IN = 'STATUS_AUTHENTICATED_NOT_LOGGED_IN'
export const STATUS_LOGGED_IN = 'STATUS_LOGGED_IN'

export const putAuthSettingsInStore = (location) => {
  return dispatch => {
    const authClientSettings = {
      url: 'https://okta.nd.edu',
      clientId: '0oa1f3ut0aKpdwap5357',
      redirectUri: `${location.origin}/user`,
      issuer: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
      ignoreSignature: true,
      responseType: 'id_token',
      responseMode: 'fragment',
      pkce: true,
      tokenManager: {
        expireEarlySeconds: 180,
        autoRenew: true,
      },
    }
    console.log('setup tokens')
    const authClient = new OktaAuth(authClientSettings)
    authClient.tokenManager.on('expired', function (key, expiredToken) {
      console.log('Token with key', key, ' has expired:')
      console.log(expiredToken)
      console.log('renew?')
      authClient.tokenManager.get('idToken')

      authClient.tokenManager.renew('idToken').then(idToken => {
        if (idToken) {
          console.log('resetting', idToken)
          dispatch(storeAuthenticationAndGetLogin(idToken))
        }
      })
    })
    dispatch(setAuthClient(authClient))
  }
}

export const setAuthClient = (authClientSettings) => {
  return {
    type: SET_AUTH_CLIENT,
    authClientSettings: authClientSettings,
    userContentPath: 'https://lsqjyc4asg.execute-api.us-east-1.amazonaws.com/prod/', // process.env.USER_CONTENT_PATH,
  }
}

export const getTokenAndPutInStore = (loginReducer, location) => {
  return dispatch => {
    if (loginReducer.authClientSettings) {
      const authClient = loginReducer.authClientSettings
      try {
        authClient.tokenManager.get('idToken')
          .then(idToken => {
            if (idToken) {
              console.log('id token?')
              if (loginReducer.status === 'STATUS_FRESH_LOAD_NOT_LOGGED_IN') {
                dispatch(storeAuthenticationAndGetLogin(idToken, loginReducer))
              }
              // If ID Token isn't found, try to parse it from the current URL
            } else if (location.hash) {
              console.log('hashed')
              authClient.token.parseFromUrl()
                .then(res => {
                  // Store parsed token in Token Manager
                  const { idToken } = res.tokens
                  authClient.tokenManager.add('idToken', idToken)
                  dispatch(storeAuthenticationAndGetLogin(idToken, loginReducer))
                })
                .catch(error => {
                  console.error(error)
                  dispatch(authorizationError())
                })
              // No token and user has not tried to login
            } else if (loginReducer.token && typeof window !== 'undefined') {
              console.log('get new token! via redrirect?')
              loginReducer.authClientSettings.token.getWithRedirect({
                scopes: [
                  'openid',
                  'email',
                  'profile',
                  'netid',
                  'directory',
                ],
                pkce: false,
              })
            } else if (loginReducer.status === 'STATUS_FRESH_LOAD_NOT_LOGGED_IN') {
              console.log('not logged in')
              dispatch(setNotLoggedIn())
            }
          })
      } catch {
        console.error('Could not access tokenManager.')
      }
    }
  }
}

export const setNotLoggedIn = () => {
  return {
    type: SET_NOT_LOGGED_IN,
  }
}
export const authorizationError = () => {
  return {
    type: AUTH_ERROR,
  }
}

export const authenticateUser = (idToken) => {
  return {
    type: AUTHENTICATE_USER,
    token: idToken,
    user: idToken.claims,
  }
}
export const getUser = () => {
  return {
    type: GET_USER,
  }
}
export const storeAuthenticationAndGetLogin = (idToken, loginReducer) => {
  return dispatch => {
    return dispatch(authenticateUser(idToken))
  }
}

export const createNewUser = (slug, body, loginReducer) => {
  return dispatch => {
    dispatch(getUser())
    fetch(
      'https://aeo5vugbxrgvzkhjjoithljz4y.appsync-api.us-east-1.amazonaws.com/graphql',
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          Authorization: loginReducer.token.idToken,
          Origin: 'http://localhost:8000',
        },
      },
    ).then(response => {
      return response.json()
    }).then(json => {
      const user = typy(json, 'data.getPortfolioUser').safeObject
      return dispatch(logUserIn(user))
    }).catch(error => {
      return dispatch(noUser())
    })
  }
}

export const noUser = () => {
  return {
    type: NO_USER,
  }
}

export const logUserIn = (user) => {
  return {
    type: LOG_USER_IN,
    user: user,
  }
}

export const logUserOut = (authClient) => {
  authClient.tokenManager.clear()

  return {
    type: LOG_USER_OUT,
  }
}
