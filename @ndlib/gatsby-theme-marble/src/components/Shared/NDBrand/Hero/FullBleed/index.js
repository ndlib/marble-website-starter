/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Heading, Box } from 'theme-ui'

export const NDBrandHeroFullBleed = ({ location, variant, image, lede, title, button }) => {
  const gutterWidth = '5vw'

  return (
    <Box id='page-header' variant={`hero.${variant}`} sx={{
      position: 'relative',
      display: 'grid',
      pb: '2rem',
      gridTemplateRows: '[header-start] 5rem [title-start] auto [title-end lede-start] auto [lede-end] 3.5rem [header-end]',
      gridTemplateColumns: `[screen-start] ${gutterWidth} [container-start title-start] 2fr [title-end image-start] 2fr [image-end container-end] ${gutterWidth} [screen-end]`,
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
      <Flex className='lede' sx={{ gridColumn: '1/3', gridRow: '3', bg: 'white', pr: '2rem', height: '220px', alignItems: 'flex-start', flexDirection: 'column', zIndex: 1 }}>
        {title ? (<Heading as='h1' variant='pageTitle' sx={{ ml: 0, marginTop: '4rem', gridColumn: 'title', gridRow: 'title', alignSelf: 'flex-end' }}>{title}</Heading>) : null }
        <p variant='lede' sx={{ display: 'block', pl: '5vw' }}>
          {lede}
        </p>
        {button ? (
          <Flex sx={{ alignItems: 'end', justifyItems: 'end', width: '100%', flexDirection: 'row', pl: '5vw' }}>
            {button}
          </Flex>) : null }
      </Flex>
      <div sx={{
        gridRow: '1/-1',
        gridColumn: 'screen',
        maxHeight: '80vw',
        maxWidth: 'none',
      }}>
        {image}
      </div>

    </Box>

  )
}

NDBrandHeroFullBleed.propTypes = {
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  image: PropTypes.object,
  button: PropTypes.object,
  title: PropTypes.string,
  lede: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

NDBrandHeroFullBleed.defaultProps = {
  variant: 'fullBleed',
}

export default NDBrandHeroFullBleed
