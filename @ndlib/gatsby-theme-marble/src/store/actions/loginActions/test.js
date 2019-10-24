import * as Actions from './'
const {
  LOG_USER_IN,
  LOG_USER_OUT,
  SET_AUTH_CLIENT,
  logUserIn,
  logUserOut,
  setAuthClient,
} = Actions

describe('loginActions', () => {
  test('logUserIn', () => {
    const claims = {
      email: 'some@mail.co',
      name: 'Mrs. Person',
    }
    const issuer = 'authority'
    const actual = logUserIn(claims, issuer)
    const expected = {
      type: LOG_USER_IN,
      user: {
        username: 'some',
        name: 'Mrs. Person',
        email: 'some@mail.co',
        issuer: 'authority',
      },
    }
    expect(actual).toEqual(expected)
  })

  test('logUserOut', () => {
    expect(logUserOut()).toEqual({ type: LOG_USER_OUT })
  })

  test('setAuthClient', () => {
    expect(setAuthClient({ some: 'settings' })).toEqual({
      type: SET_AUTH_CLIENT,
      authClientSettings: { some: 'settings' },
    })
  })
})
