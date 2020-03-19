/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'components/Internal/Link'
import typy from 'typy'
import { jsx } from 'theme-ui'
import siteLogo from 'assets/images/siteLogo.png'

export const SiteLogo = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            hideLogo
          }
        }
      }
    `,
  )
  const title = typy(site, 'siteMetadata.title').safeString
  return (
    <Link
      to='/'
      sx={{
        display: 'inline-flex',
        height: '70px',
        margin: '0',
        textDecoration: 'none',
      }}>
      {
        site.siteMetadata.hideLogo ? (
          <div
            sx={{
              fontFamily: 'logo',
              fontSize: '24px',
              lineHeight: '70px',
              minWidth: '240px',
              textAlign: 'center',
              verticalAlign: 'middle',
            }}
          >{title}</div>
        ) : (
          <img
            sx={{
              height: '50px',
              width: '200px',
              maxWidth: '200px',
              margin: '20px 0',
            }}
            alt={title}
            title={title}
            src={siteLogo}
          />
        )
      }
    </Link>
  )
}

export default SiteLogo
