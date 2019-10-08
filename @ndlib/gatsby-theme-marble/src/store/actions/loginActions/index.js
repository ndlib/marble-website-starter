export const LOG_USER_IN = 'LOG_USER_IN'
export const LOG_USER_OUT = 'LOG_USER_OUT'
export const SET_AUTH_CLIENT = 'SET_AUTH_CLIENT'
export const STATUS_NOT_LOGGED_IN = 'STATUS_NOT_LOGGED_IN'
export const STATUS_LOGGED_IN = 'STATUS_LOGGED_IN'

export const handleLogin = (idToken) => {
  const { claims, issuer } = idToken
  return dispatch => {
    return dispatch(logUserIn(claims, issuer))
  }
}

export const logUserIn = (claims, issuer) => {
  const usernameParts = claims.email.split('@')
  return {
    type: LOG_USER_IN,
    user: {
      username: usernameParts[0],
      name: claims.name,
      email: claims.email,
      issuer: issuer,
    },
  }
}

export const logUserOut = () => {
  return {
    type: LOG_USER_OUT,
  }
}

export const setAuthClient = (authClientSettings) => {
  return {
    type: SET_AUTH_CLIENT,
    authClientSettings: authClientSettings,
  }
}
