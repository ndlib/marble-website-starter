import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Link from 'components/Shared/Link'
import style from './style.module.css'

export const SiteLogo = ({ data }) => {
  const { title } = data.site.siteMetadata
  const siteLogo = data.file.publicURL
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
        file(name: {eq: "siteLogo"}) {
          publicURL
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
