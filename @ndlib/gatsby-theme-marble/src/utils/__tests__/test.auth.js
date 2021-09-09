import * as auth from '../auth'
import {
  STATUS_NOT_LOGGED_IN,
  STATUS_LOGGED_IN,
} from 'store/actions/loginActions'
const {
  isLoggedIn,
  ownsPage,
  userIdFromClaims,
} = auth

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
      user: { netid: 'jimbob' },
    }
    expect(ownsPage(loginReducer, { pathname: '/user/jimbob'})).toBeTruthy()
  })

  test('logged in and ownsPage false', () => {
    const loginReducer = {
      status: STATUS_LOGGED_IN,
      user: { netid: 'bobbyjim' },
    }
    expect(ownsPage(loginReducer, { pathname: '/user/jimbob'})).toBeFalsy()
  })
})

describe('userIdFromClaims', () => {
  test('good claims', () => {
    const claims = {
      sub: 'sub',
      iss: 'iss,',
    }
    expect(userIdFromClaims(claims)).toEqual(`${claims.sub}.${btoa(claims.iss)}`)
  })
  test('bad claims', () => {
    const claims = {
      bad: 'claims',
    }
    expect(userIdFromClaims(claims)).toBeNull()
    claims.sub = 'still bad'
    expect(userIdFromClaims(claims)).toBeNull()
    delete claims.sub
    claims.iss = 'bad iss'
    expect(userIdFromClaims(claims)).toBeNull()
  })
})
