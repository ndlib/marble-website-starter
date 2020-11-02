/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import LoginButton from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/NavigationHeader/LoginButton'
import SearchBox from 'components/Shared/SearchBox'
import ndLogo from 'assets/svg/ND_mark_white.svg'
import marbleLogo from 'assets/svg/Marble.Logo.svg'
import sx from './sx'
import HeroBackground from '../HeroBackground'
import WordMark from '../WordMark'

export const HomeHeader = ({ location }) => {
  return (
    <>
      <WordMark />
      <div sx={sx.wrapper}>

        <HeroBackground />
        <div sx={sx.heroWrapper}>
          <img
            src={marbleLogo}
            sx={sx.marbleLogo}
            alt='MARBLE: Museums, Archives, Rare Books & Libraries Exploration'
          />
          <blockquote sx={sx.text}>Explore digitized materials from Hesburgh Libraries and the Snite Museum of Art, from manuscripts to modern art</blockquote>
          <div sx={sx.searchWrapper}>
            <SearchBox location={location} />
          </div>

        </div>
        <div sx={sx.secondRow}>
          <div sx={sx.triangleTopright} />
          <div sx={sx.rightOfTriangle} />
        </div>
        <div sx={sx.topBar}>
          <Link
            to='/exhibits'
            sx={sx.exhibitsLink}
          >Digital Exhibits
          </Link>
          <div sx={sx.loginWrapper}>
            <LoginButton location={location} />
          </div>
        </div>
        <div className='logo'>
          <a href='https://nd.edu' className='desktop'>
            <img
              src={ndLogo}
              sx={sx.ndLogo}
              alt='University of Notre Dame'
            />
          </a>
        </div>
      </div>
    </>
  )
}

HomeHeader.propTpyes = {
  location: PropTypes.object.isRequired,
}
export default HomeHeader
