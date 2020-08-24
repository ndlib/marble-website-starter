/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import LoginButton from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/NavigationHeader/LoginButton'
import ndLogo from 'assets/svg/ND_mark_gold_white.svg'
import marbleLogo from 'assets/svg/Marble.Logo.svg'
import sx from './sx'

export const DefaultHeader = ({ location }) => {
  return (
    <div sx={sx.wrapper}>
      <div sx={sx.backgroundWrapper}>
        <div sx={sx.swirly} />
      </div>
      <div sx={sx.heroWrapper}>
        <Link to='/'>
          <img
            src={marbleLogo}
            sx={sx.marbleLogo}
            alt='MARBLE: Museums, Archives, Rare Books & Libraries Exploration'
          />
        </Link>
      </div>
      <div sx={sx.secondRow}>
        <div sx={sx.triangleTopright} />
        <div sx={sx.rightOfTriangle} />
      </div>
      <div sx={sx.topBar}>
        <div sx={sx.extraTriangle} />
        <Link
          to='/exhibits'
          sx={sx.exhibitsLink}
        >Digital Exhibits
        </Link>
        <Link
          to='/browse'
          sx={sx.browseLink}
        >Browse
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

DefaultHeader.propTypes = {
  location: PropTypes.object.isRequired,
}
export default DefaultHeader
