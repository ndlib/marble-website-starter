import * as Actions from './'
const {
  // GET_AUTHENTICATION,
  AUTHENTICATE_USER,
  AUTH_ERROR,
  GET_USER,
  NO_USER,
  LOG_USER_IN,
  LOG_USER_OUT,
  SET_AUTH_CLIENT,
  // putAuthSettingsInStore,
  setAuthClient,
  // getTokenAndPutInStore,
  authorizationError,
  authenticateUser,
  getUser,
  // storeAuthenticationAndGetLogin,
  // createNewUser,
  noUser,
  logUserIn,
  logUserOut,
} = Actions

describe('loginActions', () => {
  test.skip('putAuthSettingsInStore', () => {})

  test('setAuthClient', () => {
    expect(setAuthClient({ some: 'settings' })).toEqual({
      type: SET_AUTH_CLIENT,
      authClientSettings: { some: 'settings' },
      userContentPath: 'https://lsqjyc4asg.execute-api.us-east-1.amazonaws.com/prod/',
    })
  })
  test.skip('getTokenAndPutInStore', () => {})

  test.skip('storeAuthenticationAndGetLogin', () => {})

  test('authenticateUser', () => {
    expect(authenticateUser('token')).toEqual({
      type: AUTHENTICATE_USER,
      token: 'token',
    })
  })

  test('authorizationError', () => {
    expect(authorizationError()).toEqual({
      type: AUTH_ERROR,
    })
  })
  test('getUser', () => {
    expect(getUser()).toEqual({
      type: GET_USER,
    })
  })

  test.skip('getUserFromAPI', () => {})

  test.skip('createNewUser', () => {})

  test('noUser', () => {
    expect(noUser()).toEqual({
      type: NO_USER,
    })
  })

  test('logUserIn', () => {
    expect(logUserIn({ uuid: '123' })).toEqual({
      type: LOG_USER_IN,
      user: { uuid: '123' },
    })
  })

  test('logUserOut', () => {
    const authClient = {
      tokenManager: {
        clear: jest.fn,
      },
    }
    expect(logUserOut(authClient)).toEqual({
      type: LOG_USER_OUT,
    })
  })
})
