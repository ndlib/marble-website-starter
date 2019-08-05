import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import LinkedLogo from './LinkedLogo'
import style from './style.module.css'

export const BrandingHeader = ({ data }) => {
  const {
    institutionURL,
    institutionLabel,
    departmentURL,
    departmentLabel,
    headerColor,
    useBrandBar,
  } = data.site.siteMetadata

  if (!useBrandBar) {
    return null
  }
  const departmentLogo = getLogoURL(data.allFile.edges, 'departmentLogo')
  const institutionLogo = getLogoURL(data.allFile.edges, 'institutionLogo')
  return (
    <header
      className={style.wrapper}
      style={{ backgroundColor: headerColor }}
    >
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
            useBrandBar
            institutionURL
            institutionLabel
            departmentURL
            departmentLabel
            headerColor
          }
        }
        allFile(filter: {name: {in: ["departmentLogo", "institutionLogo"]}}) {
          edges {
            node {
              name
              publicURL
            }
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

export const getLogoURL = (logos, name) => {
  return logos.find(edge => {
    return edge.node.name === name
  }).node.publicURL
}
