import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'components/Internal/Link'
import typy from 'typy'
import style from './style.module.css'
import siteLogo from 'assets/images/siteLogo.png'

export const SiteLogo = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  const title = typy(site, 'siteMetadata.title').safeString
  return (
    <Link to='/' className={style.siteTitle}>
      <img
        className={style.siteLogo}
        alt={title}
        title={title}
        src={siteLogo}
      />
    </Link>
  )
}

export default SiteLogo
