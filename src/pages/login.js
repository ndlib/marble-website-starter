import React from 'react'
import { navigate } from 'gatsby'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
// import { isLoggedIn } from 'utils/auth'
import { getState } from 'utils/State'

const Login = () => {
  const [{ user }, dispatcher] = getState()

  return (
    <Layout>
      <SEO title="Login to Marble" /> 
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
        <input type='submit' value='Log In' />
      </form>
    </Layout>
  )
}

export default Login
