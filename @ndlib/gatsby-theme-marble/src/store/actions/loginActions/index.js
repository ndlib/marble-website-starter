export const LOG_USER_IN = 'LOG_USER_IN'
export const LOG_USER_OUT = 'LOG_USER_OUT'
export const SET_AUTH_CLIENT = 'SET_AUTH_CLIENT'
export const STATUS_NOT_LOGGED_IN = 'STATUS_NOT_LOGGED_IN'
export const STATUS_LOGGED_IN = 'STATUS_LOGGED_IN'

export const handleLogin = (idToken) => {
  return dispatch => {
    return dispatch(logUserIn(idToken))
  }
}

export const logUserIn = (idToken) => {
  const { claims, issuer } = idToken
  return {
    type: LOG_USER_IN,
    user: {
      username: claims.netid,
      name: claims.name,
      email: claims.email,
      issuer: issuer,
      token: idToken,
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
