import {
  GET_AUTHENTICATION,
  AUTHENTICATE_USER,
  AUTH_ERROR,
  GET_USER,
  NO_USER,
  LOG_USER_IN,
  LOG_USER_OUT,
  SET_NOT_LOGGED_IN,
  SET_AUTH_CLIENT,
  STATUS_FRESH_LOAD_NOT_LOGGED_IN,
  STATUS_NOT_LOGGED_IN,
  STATUS_TRYING_AUTHENTICATION,
  STATUS_AUTHENTICATION_FAILED,
  STATUS_AUTHENTICATED_TRYING_LOGIN,
  STATUS_AUTHENTICATED_NOT_LOGGED_IN,
  STATUS_LOGGED_IN,
} from 'store/actions/loginActions'

export const defaultState = {
  authClientSettings: null,
  userContentPath: null,
  status: STATUS_FRESH_LOAD_NOT_LOGGED_IN,
  token: null,
  user: {},
}

// eslint-disable-next-line complexity
export default (state = defaultState, action) => {
  console.log('loginReducer', action)
  switch (action.type) {
    case SET_NOT_LOGGED_IN:
      return {
        ...state,
        status: STATUS_NOT_LOGGED_IN,
      }
    case GET_AUTHENTICATION:
      return {
        ...state,
        status: STATUS_TRYING_AUTHENTICATION,
      }
    case AUTHENTICATE_USER:
      return {
        ...state,
        status: STATUS_LOGGED_IN,
        token: action.token,
        user: action.token.claims,
      }
    case AUTH_ERROR:
      return {
        ...state,
        status: STATUS_AUTHENTICATION_FAILED,
      }
    case GET_USER:
      return {
        ...state,
        status: STATUS_AUTHENTICATED_TRYING_LOGIN,
      }
    case NO_USER:
      return {
        ...state,
        status: STATUS_AUTHENTICATED_NOT_LOGGED_IN,
      }
    case LOG_USER_IN:
      return {
        ...state,
        status: STATUS_LOGGED_IN,
        user: action.user,
      }
    case LOG_USER_OUT:
      return {
        ...state,
        status: STATUS_NOT_LOGGED_IN,
        token: null,
        issuer: null,
        user: {},
      }
    case SET_AUTH_CLIENT:
      return {
        ...state,
        authClientSettings: action.authClientSettings,
        userContentPath: action.userContentPath,
      }
    default:
      return state
  }
}
