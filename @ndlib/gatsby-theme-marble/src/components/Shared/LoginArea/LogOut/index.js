import React from 'react'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'

export const LogOut = () => {
  return (
    <p>
      <MaterialButton
        id='okta'
        onClick={() => {
          navigate('/user/logout')
        }}
        primary
        wide
      >Log Out</MaterialButton>
    </p>
  )
}

export default LogOut
