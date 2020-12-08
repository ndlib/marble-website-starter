/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Footer as ThemeFooter, jsx } from 'theme-ui'
import Menu from 'components/Shared/Menu'
import sx from './sx'
export const Footer = () => {
  return (
    <ThemeFooter>
      <div sx={sx.flexWrapper}>
        <div sx={sx.textWrapper}>
          <span />
        </div>
        <div sx={sx.menuWrapper}>
          <Menu menu='footer' />
        </div>
      </div>
    </ThemeFooter>
  )
}

export default Footer
