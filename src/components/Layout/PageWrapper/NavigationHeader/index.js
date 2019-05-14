import React from 'react'
import SiteLogo from './SiteLogo'
import LoginButton from './LoginButton'
import Navigation from '../../../Shared/Navigation'
import style from './style.module.css'

export const NavigationHeader = () => {
  return (
    <header className={style.navBar}>
      <div className={style.navBarInner}>
        <SiteLogo />
        <Navigation id='top' />
        <LoginButton />
      </div>
    </header>
  )
}

export default NavigationHeader
