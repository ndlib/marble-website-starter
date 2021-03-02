/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Header, jsx } from 'theme-ui'
import typy from 'typy'
import SiteLogo from './SiteLogo'
import LoginButton from './LoginButton'
import Menu from 'components/Shared/Menu'
import HamburgerButton from './HamburgerButton'
import sx from './sx'
import theme from 'gatsby-plugin-theme-ui'

export const NavigationHeader = ({ location }) => {
  const [hamburgerOpen, toggleHamburger] = useState(false)

  return (
    <header sx={theme.styles.Header}>
      <div sx={sx.flexWrapper}>
        <SiteLogo />
        <div sx={sx.content}>
          <HamburgerButton
            onClick={() => {
              toggleHamburger(!hamburgerOpen)
            }}
            onBlur={(e) => {
              closeOnBlur(e, toggleHamburger, location)
            }}
            sxStyle={sx.hamburgerButton}
          />
          <span
            sx={sx.menu(hamburgerOpen)}
          >
            <Menu menu='top' />
            <LoginButton location={location} />
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
