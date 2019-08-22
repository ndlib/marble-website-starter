import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout as ThemeLayout, Header, Main, Container } from 'theme-ui'
import typy from 'typy'
import SiteLogo from './SiteLogo'
import LoginButton from './LoginButton'
import Menu from 'components/Shared/Menu'
import HamburgerButton from './HamburgerButton'
import style from './style.module.css'

export const NavigationHeader = ({ location }) => {
  const [hamburgerOpen, toggleHamburger] = useState(false)

  return (
    <header className={style.navBar}>
      <div className={style.navBarInner}>
        <SiteLogo />
        <div className={style.hamburger}>
          <HamburgerButton
            onClick={() => {
              toggleHamburger(!hamburgerOpen)
            }}
            onBlur={(e) => {
              closeOnBlur(e, toggleHamburger, location)
            }}
            className={style.hamburgerIcon}
          />
          <span className={hamburgerOpen ? style.hamburgerInnerOpen : style.hamburgerInnerClosed}>
            <Menu menu='top' />
            <LoginButton />
          </span>
        </div>

      </div>
    </header>
  )
}

export const closeOnBlur = (e, toggleHamburger, location) => {
  const linkTarget = typy(e, 'relatedTarget.href').safeString
  // Close if:
  //   No related target - clicking browser's native UI
  //   Clicking a something that is not a link
  //   Clicking a link to the current page - a normal link triggers a re-render resetting the default state. Clicking a link to the current page need to be closed manually
  if (!e.relatedTarget || !linkTarget || linkTarget === location.href) {
    toggleHamburger(false)
  }
}

NavigationHeader.propTypes = {
  location: PropTypes.object.isRequired,
}

export default NavigationHeader
