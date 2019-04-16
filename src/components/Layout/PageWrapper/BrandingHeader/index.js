import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import LinkedLogo from './LinkedLogo'
import style from './style.module.css'
let institutionLogo, departmentLogo
try {
  institutionLogo = require('assets/logos/institutionLogo.png')
} catch (e) {
  try {
    institutionLogo = require('assets/logos/default.institutionLogo.png')
  } catch (e) {
    console.warn('Default Institution logo found.')
  }
  console.warn('Institution not logo found.')
}

try {
  departmentLogo = require('assets/logos/departmentLogo.png')
} catch (e) {
  console.warn('Department logo not found.')
}

export const BrandingHeader = ({ data }) => {
  const {
    institutionURL,
    institutionLabel,
    departmentURL,
    departmentLabel,
  } = data.site.siteMetadata
  return (
    <header className={style.wrapper}>
      <div className={style.inner}>
        <LinkedLogo
          href={institutionURL}
          src={institutionLogo}
          alt={institutionLabel}
        />
        <LinkedLogo
          href={departmentURL}
          src={departmentLogo}
          alt={departmentLabel}
        />
      </div>
    </header>
  )
}

BrandingHeader.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        institutionURL: PropTypes.string,
        istitutionLabel: PropTypes.string,
        departmentURL: PropTypes.string,
        deparmentLabel: PropTypes.string,
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
            institutionURL
            institutionLabel
            departmentURL
            departmentLabel
          }
        }
      }
    `
      }
      render={data => (
        <BrandingHeader data={data} />
      )}
    />
  )
}
