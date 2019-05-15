import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Link from 'components/Shared/Link'
import style from './style.module.css'
const siteLogo = require('assets/logos/default.siteLogo.png')

export const SiteLogo = ({ data }) => {
  const { title } = data.site.siteMetadata
  return (
    <Link to='/' className={style.siteTitle}>
      <h1 className='accessibilityOnly'>{title}</h1>
      <img
        className={style.siteLogo}
        alt={title}
        src={siteLogo}
      />
    </Link>
  )
}

SiteLogo.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
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
        <SiteLogo data={data} />
      )}
    />
  )
}
