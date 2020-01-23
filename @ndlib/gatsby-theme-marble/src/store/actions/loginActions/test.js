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
      netid: 'some',
    }
    const issuer = 'authority'
    const idToken = {
      claims: claims,
      issuer: issuer,
    }
    const actual = logUserIn(idToken)
    const expected = {
      type: LOG_USER_IN,
      user: {
        username: 'some',
        name: 'Mrs. Person',
        email: 'some@mail.co',
        issuer: 'authority',
        token: idToken,
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
