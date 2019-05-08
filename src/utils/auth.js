const isBrowser = typeof window !== `undefined`

export const handleLogin = ({ username, password, setUser }) => {
  if (!isBrowser) return false
  console.log(username)
  console.log(password)
  console.log(setUser)
  if (username === `gatsby` && password === `demo`) {
    console.log(`Credentials match! Setting the active user.`)
    return setUser({
      name: `Jim`,
      legalName: `James K. User`,
      email: `jim@example.org`,
    })
  }

  return false
}

export const isLoggedIn = (user) => {
  if (!isBrowser) return false

  return !!(user && user.email)
}

//export const getCurrentUser = () => isBrowser && getUser()

export const logout = callback => {
  if (!isBrowser) return

  console.log(`Ensuring the \`gatsbyUser\` property exists.`)
  //  setUser({})
  callback()
}
