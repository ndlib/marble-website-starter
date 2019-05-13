import React from 'react'
import { navigate } from 'gatsby'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
import { getState } from 'utils/state'

export const Login = () => {
  const [{ user }, dispatcher] = getState()

  return (
    <Layout>
      <SEO title="Login" />
      <h1>Login</h1>

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
              },
            }
          )
          navigate(`/`)
        }}
      >
        <p>
          For this demo, please log in with the username <code>gatsby</code> and the
          password <code>demo</code>.
        </p>
        <p>
          <input type='submit' value='Login with Notre Dame Campus Authentication' />
        </p>
        <p>
          <button alt='Google' id='google'>Login with Google</button>
        </p>
        <p>
          <button alt='Facebook' id='facebook'>Login with Facebook</button>
        </p>
      </form>
    </Layout>
  )
}

export default Login
