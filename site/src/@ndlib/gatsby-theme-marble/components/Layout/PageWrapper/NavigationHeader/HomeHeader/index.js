/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import LoginButton from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/NavigationHeader/LoginButton'
import SearchBox from 'components/Shared/SearchBox'
import ndLogo from 'assets/svg/ND_mark_gold_white.svg'
import marbleLogo from 'assets/svg/Marble.Logo.svg'
import sx from './sx'

export const HomeHeader = ({ location }) => {
  return (
    <div sx={sx.wrapper}>
      <div sx={sx.swirly} />

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
      <a href='https://nd.edu'>
        <img
          src={ndLogo}
          sx={sx.ndLogo}
          alt='University of Notre Dame'
        />
      </a>
    </div>
  )
}

HomeHeader.propTpyes = {
  location: PropTypes.object.isRequired,
}
export default HomeHeader
