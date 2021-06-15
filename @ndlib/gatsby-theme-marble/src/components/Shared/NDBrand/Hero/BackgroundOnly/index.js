/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

export const NDBrandHeroBarckgroundOnly = ({ variant }) => {
  const gutterWidth = '5vw'

  return (
    <div id='page-header' variant={`pageHeaders.${variant}`} sx={{
      position: 'relative',
      display: 'grid',
      gridColumn: 'screen',
      gridRow: 'header',
      gridTemplateRows: '[header-start] 5rem [title-start] auto [title-end lede-start] auto [lede-end] 3.5rem [header-end]',
      gridTemplateColumns: `[screen-start] ${gutterWidth} [container-start title-start] 1fr [title-end image-start] 0 [image-end container-end] ${gutterWidth} [screen-end]`,
      marginBottom: 'calc(-1 * 3.5rem)',
      '::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex:'-1',
        backgroundImage: 'url(https://conductor.nd.edu/stylesheets/themes/ndt/v3/images/hdr-main-building-800.jpg)',
        backgroundRepeat: 'repeat',
      },
    }} />
  )
}

NDBrandHeroBarckgroundOnly.propTypes = {
  variant: PropTypes.string.isRequired,
}

NDBrandHeroBarckgroundOnly.defaultProps = {
  variant: 'default',
}

export default NDBrandHeroBarckgroundOnly
