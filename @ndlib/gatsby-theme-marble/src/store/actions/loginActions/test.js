import * as Actions from './'
const {
  GET_AUTHENTICATION,
  AUTHENTICATE_USER,
  GET_USER,
  NO_USER,
  LOG_USER_IN,
  LOG_USER_OUT,
  SET_AUTH_CLIENT,
  STATUS_NOT_LOGGED_IN,
  STATUS_TRYING_AUTHENTICATION,
  STATUS_AUTHENTICATED,
  STATUS_AUTHENTICATED_TRYING_LOGIN,
  STATUS_AUTHENTICATED_NOT_LOGGED_IN,
  STATUS_LOGGED_IN,
  setAuthClient,
  getTokenAndPutInStore,
  storeAuthenticationAndGetLogin,
  authenticateUser,
  getUser,
  getUserFromAPI,
  createNewUser,
  noUser,
  logUserIn,
  logUserOut,
} = Actions

describe('loginActions', () => {
  test.skip('putAuthSettingsInStore', () => {})

  test('setAuthClient', () => {
    expect(setAuthClient({ some: 'settings' }, { more: 'things' })).toEqual({
      type: SET_AUTH_CLIENT,
      authClientSettings: { some: 'settings' },
      userContentPath: { more: 'things' },
    })
  })
  test.skip('getTokenAndPutInStore', () => {})

  test.skip('storeAuthenticationAndGetLogin', () => {})

  test.skip('authenticateUser', () => {})

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

  test.skip('logUserOut', () => {})
})
