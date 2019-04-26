import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import SiteLogo from './SiteLogo'
import LoginButton from './LoginButton'
import Navigation from '../../../Shared/Navigation'
import style from './style.module.css'

export const NavigationHeader = ({ data }) => {
  const links = data.site.siteMetadata.menus.top

  return (
    <header className={style.navBar}>
      <div className={style.navBarInner}>
        <SiteLogo />
        <Navigation links={links} />
        <LoginButton />
      </div>
    </header>
  )
}

export default () => {
  return (
    <StaticQuery
      query={graphql`
      query {
        site {
          siteMetadata {
            menus {
              top {
                id
                link
                title
              }
            }
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
