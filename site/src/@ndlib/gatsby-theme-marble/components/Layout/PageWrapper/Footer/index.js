/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'gatsby'
import { Footer as ThemeFooter, jsx } from 'theme-ui'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import marbleLogo from 'assets/svg/Marble.Logo.svg'
import sniteLogo from 'assets/svg/Snite.One.Line.W.svg'
import libraryLogo from 'assets/images/library.logo.png'
import ndLogo from 'assets/images/ND_mark_white_M.png'
import sx from './sx'
export const Footer = () => {
  return (
    <ThemeFooter>
      <div sx={sx.flexWrapper}>
        <div sx={sx.footerLeftColumn}>
          <Link to='/'>
            <img
              src={marbleLogo}
              sx={sx.image}
              alt='MARBLE: Museums, Archives, Rare Books & Libraries Exploration'
            />
          </Link>
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
          <div className='contact-info'>
            <div className='address' property='address' typeof='PostalAddress'>
              <span property='streetAddress'>100 Moose Krause Circle</span><br />
              <span property='addressLocality'>Notre Dame</span>, <span property='addressRegion'>IN</span> <span property='postalCode'>46556</span> <span property='addressCountry'>USA</span>
            </div>
            <div className='footer-phone' property='telephone' content='+1 574-631-5466'>Phone <a href='tel:574-631-5466'>(574) 631–5466</a></div>
            <div className='footer-email' property='email'><a rel='noopener' href='mailto:sniteart@nd.edu'>sniteart@nd.edu</a></div>
          </div>
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
          <div className='contact-info'>
            <div className='address' property='address' typeof='PostalAddress'>
              <span property='streetAddress'>284 Hesburgh Library</span><br />
              <span property='addressLocality'>Notre Dame</span>, <span property='addressRegion'>IN</span> <span property='postalCode'>46556</span> <span property='addressCountry'>USA</span>
            </div>
            <div className='footer-phone' property='telephone' content='+1 574-631-6679'>Phone <a href='tel:574-631-6679'>(574) 631–6679</a></div>
            <div className='footer-email' property='email'><a rel='noopener' href='mailto:asklib@nd.edu'>asklib@nd.edu</a></div>
          </div>
          <div sx={sx.copyright} className='copyright'><a href='https://www.nd.edu/copyright/'>&copy; 2020</a> <a href='https://www.nd.edu'>University of Notre Dame</a></div>
        </div>
        <div sx={sx.footerRightColumn}>
          <div sx={sx.textWrapper}>
            <meta property='name' content='University of Notre Dame' />
            <a href='https://www.nd.edu/' className='mark-footer' property='url logo' typeof='ImageObject' aria-label='University of Notre Dame'>
              <img src={ndLogo} width='250' height='60' alt='University of Notre Dame' property='url' />
            </a>
            <div sx={sx.menuWrapper}>
              <Menu menu='footer' />
              <a href='https://www.nd.edu/about/accessibility/' aria-label='Notre Dame Accessibility Information'>Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </ThemeFooter>
  )
}

export default Footer
