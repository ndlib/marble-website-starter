/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import { jsx, BaseStyles } from 'theme-ui'

const HelpLink = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            iiifHelpURL
          }
        }
      }
    `,
  )
  const { iiifHelpURL } = typy(site.siteMetadata).safeObject
  if (!iiifHelpURL) {
    return null
  }
  return (
    <sup>
      <BaseStyles>
        <a
          sx={{
            display: 'inline-block',
            float: 'right',
            margin: '0',
            padding: '10px 4px 10px 20px',
            textDecoration: 'none',
          }}
          href={iiifHelpURL}
        >What is IIIF?</a>
      </BaseStyles>
    </sup>

  )
}

export default HelpLink
