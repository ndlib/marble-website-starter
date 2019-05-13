export const LOG_USER_IN = 'LOG_USER_IN'
export const LOG_USER_OUT = 'LOG_USER_OUT'
export const STATUS_NOT_LOGGED_IN = 'STATUS_NOT_LOGGED_IN'
export const STATUS_LOGGED_IN = 'STATUS_LOGGED_IN'

export const handleLogin = () => {
  return dispatch => {
    return dispatch(logUserIn('username', 'Ms. Logged In User', 'user@nd.edu'))
  }
}

export const logUserIn = (username, fullname, email) => {
  return {
    type: LOG_USER_IN,
    user: {
      username: username,
      fullname: fullname,
      email: email,
    },
  }
}
