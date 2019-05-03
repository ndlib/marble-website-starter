import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import SiteLogo from './SiteLogo'
import LoginButton from './LoginButton'
import Navigation from '../../../Shared/Navigation'
import style from './style.module.css'

export const NavigationHeader = ({ data }) => {
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

NavigationHeader.propTypes = {
  data: PropTypes.object.isRequired,
}

export default () => {
  return (
    <StaticQuery
      query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
      }
      render={data => (
        <NavigationHeader data={data} />
      )}
    />
  )
}
