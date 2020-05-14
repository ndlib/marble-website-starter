/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Footer as ThemeFooter, jsx } from 'theme-ui'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import sniteLogo from 'assets/svg/Snite.One.Line.W.svg'
import libraryLogo from 'assets/images/library.logo.png'
import sx from './sx'
export const Footer = () => {
  const date = new Date()
  return (
    <ThemeFooter>
      <div sx={sx.flexWrapper}>
        <div sx={sx.textWrapper}>
          <span>© {date.getFullYear()} University of Notre Dame</span>
          <address>Notre Dame, IN 46556 USA</address>
          <span><a href='/help/contact-us'>Contact Us</a></span>
        </div>
        <a
          href='https://sniteartmuseum.nd.edu/'
          sx={sx.imageWrapper}
        >
          <img
            src={sniteLogo}
            sx={sx.image}
            alt='Snite Art Museum'
          />
        </a>
        <a
          href='https://library.nd.edu'
          sx={sx.imageWrapper}
        >
          <img
            src={libraryLogo}
            sx={sx.image}
            alt='Hesburgh Library'
          />
        </a>
        <div sx={sx.menuWrapper}>
          <Menu menu='footer' />
        </div>
      </div>
    </ThemeFooter>
  )
}

export default Footer
