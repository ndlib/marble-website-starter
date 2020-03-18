/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Footer as ThemeFooter, jsx } from 'theme-ui'
import Menu from 'components/Shared/Menu'
import sx from './sx'
export const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
    query {
      site {
        siteMetadata {
          footerText
        }
      }
    }
  `,
  )
  const footerText = site.siteMetadata.footerText
  return (
    <ThemeFooter>
      <div sx={sx.flexWrapper}>
        <div sx={sx.textWrapper}>
          <span dangerouslySetInnerHTML={{ __html: footerText }} />
        </div>
        <div sx={sx.menuWrapper}>
          <Menu menu='footer' />
        </div>
      </div>
    </ThemeFooter>
  )
}

export default Footer
