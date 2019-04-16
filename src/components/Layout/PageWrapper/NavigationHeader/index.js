import React from 'react'
import SiteLogo from './SiteLogo'
import Hamburger from './Hamburger'
import LoginButton from './LoginButton'
import style from './style.module.css'

export const NavigationHeader = () => {
  return (
    <header className={style.navBar}>
      <div className={style.navBarInner}>
        <SiteLogo />
        <Hamburger />
        <LoginButton />
      </div>
    </header>
  )
}

export default NavigationHeader
