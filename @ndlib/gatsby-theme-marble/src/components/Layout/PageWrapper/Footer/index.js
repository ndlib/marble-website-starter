/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import Menu from 'components/Shared/Menu'
import sx from './sx'
import theme from 'gatsby-plugin-theme-ui'

export const Footer = () => {
  return (
    <footer sx={theme.styles.Footer}>
      <div sx={sx.flexWrapper}>
        <div sx={sx.textWrapper}>
          <span />
        </div>
        <div sx={sx.menuWrapper}>
          <Menu menu='footer' />
        </div>
      </div>
    </footer>
  )
}

export default Footer
