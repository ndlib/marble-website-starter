import { STATUS_LOGGED_IN } from 'store/actions/loginActions'

const isBrowser = typeof window !== `undefined`

export const isLoggedIn = (loginReducer) => {
  if (!isBrowser) return false
  return (loginReducer.status === STATUS_LOGGED_IN)
}

/*
// export const getCurrentUser = () => isBrowser && getUser()

export const logout = callback => {
  if (!isBrowser) return

  console.log(`Ensuring the \`gatsbyUser\` property exists.`)
  //  setUser({})
  callback()
}


export const handleLogin = ({ username, password, getState }) => {
  if (!isBrowser) return false


  if (username === `gatsby` && password === `demo`) {
    console.log(`Credentials match! Setting the active user.`)
    dispatcher(
      {
        type: 'setUser',
        newUser: {
          name: `Jim`,
          legalName: `James K. User`,
          email: `jim@example.org`,
        },
      }
    )
    return true
  }

  return false
}
*/
