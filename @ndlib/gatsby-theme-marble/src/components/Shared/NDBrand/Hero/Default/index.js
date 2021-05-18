/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Heading } from 'theme-ui'

export const NDBrandHeroDefault = ({ location, variant, image, lede, title, button }) => {
  const gutterWidth = '5vw'

  return (
    <div id='page-header' variant={`pageHeaders.${variant}`} sx={{
      position: 'relative',
      display: 'grid',
      gridTemplateRows: '[header-start] 5rem [title-start] auto [title-end lede-start] auto [lede-end] 3.5rem [header-end]',
      gridTemplateColumns: `[screen-start] ${gutterWidth} [container-start title-start] 1fr [title-end image-start] 2fr [image-end container-end] ${gutterWidth} [screen-end]`,
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
        gridRow: 'header-start/title-end',
      },
    }}>
      <Heading as='h1' variant='pageTitle' sx={{ ml: 0, pr: '2rem', marginTop: '4rem', gridColumn: 'title', gridRow: 'title', alignSelf: 'flex-end' }}>
        {title}
      </Heading>
      <Flex sx={{ gridColumn: 'title', gridRow: 'lede', bg: 'white', pr: '2rem', height: '200px', alignItems: 'flex-start', flexDirection: 'column' }}>
        <p variant='lede' sx={{ display: 'block' }}>
          {lede}
        </p>
        <Flex sx={{ alignItems: 'end', justifyItems: 'end', width: '100%', flexDirection: 'row' }}>
          {button}
        </Flex>
      </Flex>
      <div sx={{
        gridRow: 'title-start/header-end',
        gridColumn: 'image-start/screen-end',
      }}>
        {image}
      </div>

    </div>

  )
}

NDBrandHeroDefault.propTypes = {
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  image: PropTypes.object,
  button: PropTypes.object,
  title: PropTypes.string,
  lede: PropTypes.string,
}

NDBrandHeroDefault.defaultProps = {
  variant: 'default',
}

export default NDBrandHeroDefault
