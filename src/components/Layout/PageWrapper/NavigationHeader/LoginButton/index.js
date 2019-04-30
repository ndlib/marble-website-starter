import React from 'react'
import Link from 'components/Shared/Link'
import style from './style.module.css'
const LoginButton = () => {
  return (
    <div className={style.loginButton}><Link to='/login'>Login</Link></div>
  )
}

export default LoginButton
