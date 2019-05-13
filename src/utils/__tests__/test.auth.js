import { isLoggedIn } from '../auth'
import {
  STATUS_NOT_LOGGED_IN,
  STATUS_LOGGED_IN,
} from 'store/actions/loginActions'

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
