import * as auth from '../auth'
import {
  STATUS_NOT_LOGGED_IN,
  STATUS_LOGGED_IN,
} from 'store/actions/loginActions'
const { isLoggedIn, ownsPage } = auth

describe('isLoggedIn', () => {
  test('it returns true if the user is logged in', () => {
    const loginReducer = {
      status: STATUS_LOGGED_IN,
    }
    expect(isLoggedIn(loginReducer)).toBeTruthy()
  })

  test('it returns false if the user is not logged in', () => {
    const loginReducer = {
      status: STATUS_NOT_LOGGED_IN,
    }
    expect(isLoggedIn(loginReducer)).toBeFalsy()
  })
})

describe('ownsPage', () => {
  test('not logged in', () => {
    const loginReducer = {
      status: STATUS_NOT_LOGGED_IN,
    }
    expect(ownsPage(loginReducer, null)).toBeFalsy()
  })

  test('logged in and ownsPage true', () => {
    const loginReducer = {
      status: STATUS_LOGGED_IN,
      user: { userName: 'jimbob' },
    }
    expect(ownsPage(loginReducer, 'jimbob')).toBeTruthy()
  })

  test('logged in and ownsPage false', () => {
    const loginReducer = {
      status: STATUS_LOGGED_IN,
      user: { userName: 'bobbyjim' },
    }
    expect(ownsPage(loginReducer, 'jimbob')).toBeFalsy()
  })
})
