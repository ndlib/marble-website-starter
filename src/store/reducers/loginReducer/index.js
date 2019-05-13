import {
  LOG_USER_IN,
  LOG_USER_OUT,
  STATUS_NOT_LOGGED_IN,
  STATUS_LOGGED_IN,
} from 'store/actions/loginActions'

export const defaultState = {
  status: STATUS_NOT_LOGGED_IN,
  user: {},
}

export default(state = defaultState, action) => {
  switch (action.type) {
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
        user: {},
      }
    default:
      return state
  }
}
