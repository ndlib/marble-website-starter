import React from 'react'
import { navigate } from 'gatsby'
//import { isLoggedIn } from 'utils/auth'
import { getState } from 'utils/State'

const Login = () => {
  const [{ user }, dispatcher] = getState()

  return (
    <form
      method='post'
      onSubmit={event => {
        event.preventDefault()
        dispatcher(
          {
            type: 'setUser',
            newUser: {
              name: `Jim`,
              legalName: `James K. User`,
              email: `jim@example.org`,
            }
          }
        )
        navigate(`/app/profile`)
       }}
    >
      <p>
        For this demo, please log in with the username <code>gatsby</code> and the
        password <code>demo</code>.
      </p>
      <input type='submit' value='Log In' />
    </form>
  )
}

export default Login
